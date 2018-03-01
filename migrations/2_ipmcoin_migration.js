var IPMCoin = artifacts.require("./IPMCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(IPMCoin,'IPMChain','IPM');
};
