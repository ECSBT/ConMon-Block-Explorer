export PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'

geth --jspath "/root/geth/scripts" --exec "loadScript(\"simulateTransactions.js\"); randomTransactions($1, $2)" attach ipc:/root/geth/node/geth.ipc