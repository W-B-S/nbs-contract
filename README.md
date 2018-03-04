# ipm-contract
This is the contract content for ERC20 Token of Ethereum block chain.

truffle.js:

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
     ropsten:  {
     network_id: 3,
     host: "localhost",
     port:  8545,
     gas:   2900000
}
  },
   rpc: {
 host: 'localhost',
 post:8080
   }
};

Once that is all set up you need to install the ethereum client Geth. Then, run:
geth --testnet account new


Run the geth instance with permissions opened up like this :
geth --testnet --fast --rpc --rpcapi eth,net,web3,personal

Then, unlock that geth account with the following commands in a new tab:
geth attach http://127.0.0.1:8545

This one will open your geth console
personal.unlockAccount(eth.accounts[0])

Now go back into your Truffle folder with your compiled smart contract and run this command:
truffle migrate --network ropsten

You should see output likes this:

Using network ‘ropsten’.
Running migration: 2_deploy_contracts.js
 Deploying EtherGoods…
 … 0x1f61eb2b7ab998141354dbfcc0c37cc3da2938d3f8fe924d0ed159e635a9bbea
Saving successful migration to network…
 … 0xb5c8dda5b50986020ceaa1989d47d71b12845a854d722919fbd685878e0e8b72