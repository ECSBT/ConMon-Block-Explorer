var accountsReceiving = envAccountsReceiving.split(",");

var amountArray = [
    0.0001,
    0.0002,
    0.0003,
    0.0004,
    0.0005
];

var minerAccount = web3.eth.coinbase;

function randomTransactions(txQuantity, txDelay) {
    var nonce = web3.eth.getTransactionCount(minerAccount);
    for (i = 0; i < txQuantity; i++) {
        if (web3.eth.getBalance(minerAccount) >= web3.toWei('0.1')) {
            var randomAccount = accountsReceiving[Math.floor(Math.random() * accountsReceiving.length)];
            var randomAmount = amountArray[Math.floor(Math.random() * amountArray.length)];
            web3.personal.unlockAccount(minerAccount, "act1", 10000);
            web3.eth.sendTransaction({
                from: minerAccount, 
                to: randomAccount, 
                nonce: nonce++,
                value: web3.toWei(randomAmount)
            });
            web3.admin.sleep(txDelay); //admin.sleepBlocks(n)
        }
    }
    return;
}
