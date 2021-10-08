package main

import (
	"geth_agent/internal/agent"
	"geth_agent/internal/config"
	"log"
)

func main() {
	var (
		conf = config.Load()
		ag   = agent.New(conf)
		err  = ag.Start()
	)

	if err != nil {
		log.Fatal(err)
	}
}
