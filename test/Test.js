var IPMCoin = artifacts.require("./IPMCoin2.sol");

contract('IPMCoin', function(accounts) {

    it('should buy success', async () => {

        var account_four   = accounts[3];
        var account_one   = accounts[0];

        let ipm_coin = await IPMCoin.deployed();

        await ipm_coin.transfer(ipm_coin.address, 4e26, {from:account_one});

        let balace_ipm = await ipm_coin.balanceOf.call(ipm_coin.address);

        console.log("balace_ipm=>" + (balace_ipm));

        let ret = await ipm_coin.buy({from:account_four, value:web3.toWei(0.0025, "ether")});

        console.log("ret_=>"+JSON.stringify(ret));


        let balace_acc = await ipm_coin.balanceOf.call(account_four);

        console.log("balace_acc=>" + (balace_acc));

        let balace_ipm_after = await ipm_coin.balanceOf.call(ipm_coin.address);

        console.log("balace_ipm_after=>" + (balace_ipm_after));
    });

});