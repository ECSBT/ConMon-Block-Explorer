#!/bin/bash

if [ ! "$(docker ps -q -f name=agent)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=agent)" ]; then
        docker rm agent
    fi
    docker-compose -f /home/geth-agent/docker-compose.yml up -d
fi