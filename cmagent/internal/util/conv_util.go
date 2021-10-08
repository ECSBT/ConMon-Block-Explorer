package util

import (
	"github.com/ethereum/go-ethereum/common/hexutil"
	"log"
)

func Hex2int(h string) int64 {
	ib, err := hexutil.DecodeUint64(h)

	if err != nil {
		log.Println(err)
		return 0
	}

	return int64(ib)
}

func Hex2str(s string) {
	sb, err := hexutil.Decode(s)

	if err != nil {
		log.Println(err)
		return
	}

	log.Printf("%s", string(sb))
}