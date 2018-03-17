var IPMCoin = artifacts.require("./IPMCoin.sol");
var IPMCoin2 = artifacts.require("./IPMCoin2.sol");
var ConvertLib = artifacts.require("./ConvertLib.sol");

module.exports = function(deployer) {

    // deployer.deploy(IPMCoin).then(function(instance){
    // console.log(instance);
    // });

    deployer.deploy(IPMCoin2).then(function(instance){
        console.log(instance);
    });

    // deployer.deploy(IPMCoin2, 1e10, "IPMCOIN2","IPM2").then(function(instance){
    //     console.log(instance);
    // });

    deployer.deploy(ConvertLib).then(function(instance){
        console.log(instance);
    });
};
