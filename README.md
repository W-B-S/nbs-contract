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

Using network 'ropsten'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x3f0017af1aa885d1aa83ec3d100b4f4496445b21d2096e01a652eb7fe90ec548



  Migrations: 0x4247685bf35cfaf922aa9f5d80c6ae24069341d0
Saving successful migration to network...
  ... 0x2b53aba64c8d43953c33ab40ce866797a4a92af01da55aa2be3e83f892184748
Saving artifacts...
Running migration: 2_ipmcoin_migration.js
  Deploying IPMCoin...
  ... 0x222cc6ab1eb399126d721116780aaca5fcfc801e0b63a388313b206148b28bc4


  IPMCoin: 0x1712b9b0144539ad69ffdd239c8361ce4ba86ce6
undefined
Saving successful migration to network...
  ... 0xc81206c06aea4543ad0f09a836f7741dcc86750eb84ff21fa1b99ee6ed21b9a0
  