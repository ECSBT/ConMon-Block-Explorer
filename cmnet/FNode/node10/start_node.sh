rm /root/geth/node/geth/nodekey && \
cp /root/geth/nodekey /root/geth/node/geth/nodekey && \
nohup geth --datadir "/root/geth/node" \
--verbosity 10 \
--syncmode "full" \
--light.serve 30 \
--nat extip:172.19.0.19 \
--netrestrict 172.19.0.0/20 \
--http \
--http.api admin,miner,debug,web3,eth,txpool,personal,ethash,net \
--http.addr "0.0.0.0" \
--http.port 8545 \
--port 30312 \
--networkid 12345 \
--nodiscover \
--nousb 2>/root/geth/node.log &

tail -f ./node.log