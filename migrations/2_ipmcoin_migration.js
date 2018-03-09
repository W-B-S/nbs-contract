var IPMCoin = artifacts.require("./IPMCoin.sol");
var ConvertLib = artifacts.require("./ConvertLib.sol");

module.exports = function(deployer) {
  deployer.deploy(IPMCoin).then(function(instance){
  	console.log(instance);
  });

    deployer.deploy(ConvertLib).then(function(instance){
        console.log(instance);
    });
};
