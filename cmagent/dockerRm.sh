#!/bin/bash

docker rm --force agent && \
docker image rm geth-agent:latest && \
docker-compose build