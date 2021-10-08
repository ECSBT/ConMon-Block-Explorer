rm /root/geth/node/geth/nodekey && \
cp /root/geth/nodekey /root/geth/node/geth/nodekey && \
nohup geth --datadir "/root/geth/node" \
--verbosity 5 \
--allow-insecure-unlock \
--exec "miner.setEtherbase(eth.coinbase)" \
--mine \
--miner.threads=1 \
--miner.noverify \
--nat extip:172.19.0.12 \
--netrestrict 172.19.0.0/20 \
--http \
--http.api admin,miner,debug,web3,eth,txpool,personal,ethash,net \
--http.addr "0.0.0.0" \
--http.port 8545 \
--port 30305 \
--networkid 12345 \
--nodiscover \
--nousb 2>/root/geth/node.log &

./envLoad.sh && \

service cron restart &

tail -f ./node.log