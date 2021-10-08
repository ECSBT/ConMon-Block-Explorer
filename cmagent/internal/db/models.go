package db

import (
	//"context"
	"geth_agent/internal/config"
	"time"

	influxdb2 "github.com/influxdata/influxdb-client-go"
	//log "github.com/sirupsen/logrus"
)

type Store struct {
	conf *config.Config
}

func New(conf *config.Config) *Store {
	return &Store{conf: conf}
}

func (s *Store) InsertMeasurement(dbclient influxdb2.Client, datamap map[string]string) {
	dbclient.Options().SetBatchSize(uint(len(datamap)))
	//  write client for writes to desired bucket
	wAPI := dbclient.WriteAPI("", s.conf.DatabaseName)

	insertmap := make(map[string]interface{})
	for key, value := range datamap {
		insertmap[key] = value
	}

	// create point using full params constructor
	p := influxdb2.NewPoint(
		"Blocks",
		map[string]string{
			"Block": datamap["last_block"],
		},
		insertmap,
		time.Now(),
	)
	// write point immediately
	wAPI.WritePoint(p)
	wAPI.Flush()
}
