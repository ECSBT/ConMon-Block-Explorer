export PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'

geth attach ipc:/root/geth/node/geth.ipc --exec "miner.start(1)"