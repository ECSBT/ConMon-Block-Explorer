#!/bin/bash

echo -e "var envAccountsReceiving = \"$ACCOUNTARRAY\";
$(cat scripts/simulateTransactions.js)" > scripts/simulateTransactions.js