package agent

import (
	"bytes"
	"context"
	"io/ioutil"
	"strconv"

	//"fmt"

	"geth_agent/internal/config"
	"geth_agent/internal/db"

	"encoding/json"
	hex "geth_agent/internal/util"
	"net/http"
	"time"

	"github.com/ethereum/go-ethereum/ethclient"
	influxdb2 "github.com/influxdata/influxdb-client-go"

	//jsonrpc2 "github.com/AdamSLevy/jsonrpc2"
	log "github.com/sirupsen/logrus"
)

var iTimer int64

type Agent struct {
	conf  *config.Config
	store *db.Store
}

type GetJsonPayload struct {
	ReqId     int `json:"id"`
	GetResult struct {
		BlockNumber       string   `json:"number"`
		BlockSize         string   `json:"size"`
		BlockDifficulty   string   `json:"difficulty"`
		BlockTransactions []string `json:"transactions"`
		BlockUncles       []string `json:"uncles"`
		BlockGasLimit     string   `json:"gasLimit"`
		BlockGasUsed      string   `json:"gasUsed"`
		BlockHash         string   `json:"hash"`
		BlockParentHash   string   `json:"parentHash"`
		BlockMiner        string   `json:"miner"`
		BlockNonce        string   `json:"nonce"`
		BlockTimestamp    string   `json:"timestamp"`
		TotalDifficulty   string   `json:"totalDifficulty"`
	} `json:"result"`
}

type SetJsonPayload struct {
	TxCount     int `json:"txpool/valid.count"`
	NetPeers    int `json:"p2p/peers"`
	NetIngress  int `json:"p2p/ingress.count"`
	NetEgress   int `json:"p2p/egress.count"`
	CpuProcLoad int `json:"system/cpu/procload"`
	CpuSysLoad  int `json:"system/cpu/sysload"`
	CpuSysWait  int `json:"system/cpu/syswait"`
	CpuThreads  int `json:"system/cpu/threads"`
	DiskWrite   int `json:"system/disk/writebytes"`
	DiskRead    int `json:"system/disk/readbytes"`
	MemAllocs   int `json:"system/memory/allocs.count"`
	MemFrees    int `json:"system/memory/frees.count"`
	MemPauses   int `json:"system/memory/pauses.count"`
	MemUsed     int `json:"system/memory/used"`
}

func New(conf *config.Config) *Agent {
	return &Agent{conf: conf, store: db.New(conf)}
}

func perror(err error) {
	if err != nil {
		log.Error(err)
		return
	}
}

func (a *Agent) nerror(err error, datamap map[string]string, dbclient influxdb2.Client) {
	datamap["node_status"] = "0"

	log.Infof("node/agent connection is offline: %v", datamap)
	a.store.InsertMeasurement(dbclient, datamap)

	if err != nil {
		log.Error(err)
		return
	}
}

func getJson(url string, cmethod string, params []string, cid int64, target interface{}) error {
	idString := strconv.FormatInt(cid, 10)
	var jsonStr = []byte(`{"jsonrpc": "2.0", "method": "` + cmethod + `", "params":["` + params[0] + `", ` + params[1] + `], "id": ` + idString + `}`)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	perror(err)
	req.Header.Set("Content-Type", "application/json")
	myClient := &http.Client{Timeout: 10 * time.Second}
	res, err := myClient.Do(req)
	perror(err)
	defer res.Body.Close()

	resB, err := ioutil.ReadAll(res.Body)

	//resStr := string(resB)
	//log.Infof("resStr: %v", resStr)
	return json.Unmarshal(resB, target)
}

func setJson(url string, target interface{}) error {
	myClient := &http.Client{Timeout: 10 * time.Second}
	res, err := myClient.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	//log.Infof("set response: %v", res.Body)
	return json.NewDecoder(res.Body).Decode(target)
}

func (a *Agent) Start() error {
	// create new client with default option for server url authenticate by token
	dbclient := influxdb2.NewClientWithOptions(a.conf.Host, a.conf.AuthToken, influxdb2.DefaultOptions().SetHTTPRequestTimeout(10))
	log.Infof("connected to database: %s", a.conf.Host)

	client, err := ethclient.Dial(a.conf.EthRpcUrl)
	//nerror(err, a, dbclient)
	perror(err)
	defer client.Close()

	log.Infof("connected to: %s", a.conf.EthRpcUrl)
	log.Infof("connected to: %s", a.conf.EthMetricsUrl)

	datamap := make(map[string]string)

	sPayload := SetJsonPayload{}
	gPayload := GetJsonPayload{}

	netId, err := client.NetworkID(context.Background())
	perror(err)

	curlMethod := string("eth_getBlockByNumber")
	curlParams := []string{"latest", "false"}

	present := time.Now().Unix()

	getJson(a.conf.EthRpcUrl, curlMethod, curlParams, present, &gPayload)

	datamap["node_status"] = "1"
	datamap["chain_id"] = strconv.Itoa(int(netId.Int64()))
	datamap["last_block"] = "0"
	datamap["block_timestamp"] = strconv.Itoa(int(hex.Hex2int(gPayload.GetResult.BlockTimestamp)))

	tick1 := time.Tick(1 * time.Second)
	for {
		select {
		case <-tick1:
			a.registerMetrics(dbclient, client, gPayload, sPayload, datamap, curlMethod, curlParams)
		}
	}
	return nil
}

func (a *Agent) registerMetrics(dbclient influxdb2.Client, client *ethclient.Client, gPayload GetJsonPayload, sPayload SetJsonPayload, datamap map[string]string, curlMethod string, curlParams []string) {
	header, err := client.HeaderByNumber(context.Background(), nil)
	perror(err)
	block, err := client.BlockByNumber(context.Background(), header.Number)
	perror(err)

	cBlock := int(block.Number().Int64())
	present := time.Now().Unix()

	//TEST FOR TIMER
	//if iTimer > 0 {
	//	timerTest := iTimer - present
	//	log.Infof("timerTest: %v", timerTest)
	//}

	lastB := datamap["last_block"]
	lBlock, err := strconv.Atoi(lastB)
	perror(err)

	if cBlock > lBlock {
		getJson(a.conf.EthRpcUrl, curlMethod, curlParams, present, &gPayload)
		//log.Infof("gPayload: %v", gPayload)
		setJson(a.conf.EthMetricsUrl, &sPayload)
		//log.Infof("sPayload: %v", sPayload)

		pbt := datamap["block_timestamp"]
		previousBlockTime, err := strconv.Atoi(pbt)
		perror(err)

		// Block Metrics
		datamap["last_block"] = strconv.Itoa(cBlock)
		datamap["block_difficulty"] = strconv.Itoa(int(hex.Hex2int(gPayload.GetResult.BlockDifficulty)))
		datamap["block_size"] = strconv.Itoa(int(hex.Hex2int(gPayload.GetResult.BlockSize)))
		datamap["block_transactions_count"] = strconv.Itoa(len(gPayload.GetResult.BlockTransactions))
		datamap["block_gas_limit"] = strconv.Itoa(int(hex.Hex2int(gPayload.GetResult.BlockGasLimit)))
		datamap["block_gas_used"] = strconv.Itoa(int(hex.Hex2int(gPayload.GetResult.BlockGasUsed)))
		datamap["block_uncles_count"] = strconv.Itoa(len(gPayload.GetResult.BlockUncles))
		datamap["block_nonce"] = strconv.Itoa(int(hex.Hex2int(gPayload.GetResult.BlockNonce)))
		datamap["block_timestamp"] = strconv.Itoa(int(hex.Hex2int(gPayload.GetResult.BlockTimestamp)))
		currentBlockTime, err := strconv.Atoi(datamap["block_timestamp"])
		perror(err)
		datamap["block_propagation_time"] = strconv.Itoa(int(currentBlockTime - previousBlockTime))
		datamap["total_difficulty"] = strconv.Itoa(int(hex.Hex2int(gPayload.GetResult.TotalDifficulty)))

		datamap["block_hash"] = string(gPayload.GetResult.BlockHash)
		datamap["block_parent_hash"] = string(gPayload.GetResult.BlockParentHash)
		datamap["block_miner"] = string(gPayload.GetResult.BlockMiner)

		// Other Metrics
		datamap["total_transactions_count"] = strconv.Itoa(int(sPayload.TxCount))
		datamap["node_peers"] = strconv.Itoa(int(sPayload.NetPeers))
		datamap["net_ingress"] = strconv.Itoa(int(sPayload.NetIngress))
		datamap["net_egress"] = strconv.Itoa(int(sPayload.NetEgress))
		datamap["cpu_process_load"] = strconv.Itoa(int(sPayload.CpuProcLoad))
		datamap["cpu_system_load"] = strconv.Itoa(int(sPayload.CpuSysLoad))
		datamap["cpu_system_wait"] = strconv.Itoa(int(sPayload.CpuSysWait))
		datamap["cpu_threads"] = strconv.Itoa(int(sPayload.CpuThreads))
		datamap["disk_writes"] = strconv.Itoa(int(sPayload.DiskWrite))
		datamap["disk_reads"] = strconv.Itoa(int(sPayload.DiskRead))
		datamap["memory_allocations"] = strconv.Itoa(int(sPayload.MemAllocs))
		datamap["memory_frees"] = strconv.Itoa(int(sPayload.MemFrees))
		datamap["memory_pauses"] = strconv.Itoa(int(sPayload.MemPauses))
		datamap["memory_used"] = strconv.Itoa(int(sPayload.MemUsed))

		log.Infof("datamap being inserted: %v", datamap)
		iTimer = time.Now().Add(time.Second * 86400).Unix()
		a.store.InsertMeasurement(dbclient, datamap)
	} else if present > iTimer {
		log.Infof("Copy of last known datamap being re-inserted: %v", datamap)
		iTimer = time.Now().Add(time.Second * 86400).Unix()
		a.store.InsertMeasurement(dbclient, datamap)
	}
}
