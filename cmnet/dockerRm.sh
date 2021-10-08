#!/bin/bash

for ((i=1; i<=$1; i++)); do
    docker stop node$i
done && \

for ((i=1; i<=$1; i++)); do
    docker rm node$i
done && \

for ((i=1; i<=$1; i++)); do
    docker image rm -f $1n:node$i
done