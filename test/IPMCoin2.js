var IPMCoin = artifacts.require("./IPMCoin2.sol");

contract('IPMCoin', function(accounts) {

    //------function balanceOf(address target) public view returns (uint256)-------
    it("should put 1e+28 MetaCoin in the first account", function() {
        return IPMCoin.deployed().then(function(instance) {
            return instance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.valueOf(), 1e28, "1e28 wasn't in the first account");
        });
    });


    //-------function transfer(address _to, uint256 _value)------
    it("should send coin correctly", function() {
        var ipm;

        // Get initial balances of first and second account.
        var account_one = accounts[0];
        var account_two = accounts[1];

        var account_one_starting_balance;
        var account_two_starting_balance;
        var account_one_ending_balance;
        var account_two_ending_balance;

        var amount = 1e27;

        return IPMCoin.deployed().then(function(instance) {
            ipm = instance;
            return ipm.balanceOf(account_one);
        }).then(function(balance) {
            account_one_starting_balance = balance.toNumber();
            return ipm.balanceOf(account_two);
        }).then(function(balance) {
            account_two_starting_balance = balance.toNumber();
            return ipm.transfer(account_two, amount, {from: account_one});
        }).then(function() {
            return ipm.balanceOf(account_one);
        }).then(function(balance) {
            account_one_ending_balance = balance.toNumber();
            return ipm.balanceOf(account_two);
        }).then(function(balance) {
            account_two_ending_balance = balance.toNumber();

            assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
            assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
        });
    });

    //-------function approve(address _spender, uint256 _value) public returns (bool success)-------
    it('Should success to approve an address from me', function () {
        var ipm_coin;
        var account_two = accounts[1];

        return IPMCoin.deployed().then(function (instance) {
            ipm_coin = instance;
            return ipm_coin.approve.call(account_two, 4.5e22);
        }).then(function (result) {
            assert.equal(result, true, "Failed to approve amount from owner to account 2");
        });
    });

    //-------function  transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
    it('should successfully Transfer amount of ipm from a to b', function () {

        var ipm_coin;

        var account_one   = accounts[0];
        var account_two   = accounts[1];
        var account_three = accounts[2];

        var account_one_start_balance;
        var account_two_start_balance;

        var account_one_ending_balance;
        var account_two_ending_balance;

        var amount_to_trans = 1e+10;

        return IPMCoin.deployed().then(function (instance) {

            ipm_coin = instance;
            return ipm_coin.approve(account_three, 2 * amount_to_trans, {from: account_one});

        }).then(function (value) {

            // console.log("approve:" + JSON.stringify(ret));
            return ipm_coin.balanceOf(account_one);
        }).then(function (balance) {

            account_one_start_balance = balance.toNumber();
            return ipm_coin.balanceOf(account_two);
        }).then(function (balance) {

            account_two_start_balance = balance.toNumber();
            return ipm_coin.transferFrom(account_one, account_two, amount_to_trans, {from:account_three});
        }).then(function (ret) {

            // console.log("transferFrom:" + JSON.stringify(ret));
            return ipm_coin.balanceOf(account_one);

        }).then(function (balance) {

            account_one_ending_balance = balance.toNumber();
            return ipm_coin.balanceOf(account_two);

        }).then(function (balance) {

            account_two_ending_balance = balance.toNumber();

            assert.equal(account_one_ending_balance,
                account_one_start_balance - amount_to_trans,
                "Amount wasn't correctly taken from the accont one.");

            assert.equal(account_two_ending_balance - amount_to_trans,
                account_two_start_balance,
                "Amount wasn't correctly received by account two.");
        });
    });

    
    //-------function burn(uint256 _value) public returns (bool success)
    it('should burn successfully', async () => {

        var account_one   = accounts[0];

        var amount_to_burn = 1e+12;

        let ipm_coin = await IPMCoin.deployed();

        let balance_account_one_bef = await ipm_coin.balanceOf.call(account_one);
        let total_supply_bef = await ipm_coin.totalSupply.call();

        await ipm_coin.burn(amount_to_burn, {from:account_one});

        let balance_account_one_aft = await ipm_coin.balanceOf.call(account_one);

        assert.equal(balance_account_one_bef.toNumber(),
            balance_account_one_aft.toNumber() + amount_to_burn,  "Burned failed!");

        let total_supply_aft = await ipm_coin.totalSupply.call();

        assert.equal(total_supply_bef - amount_to_burn, total_supply_aft, "Burned failed!");

    });

    //-------function burnFrom(address _from, uint256 _value) public returns (bool success)
    it('should burnfrom successfully', async () => {

        var account_one   = accounts[0];
        var account_three   = accounts[2];

        var amount_to_burn = 1;

        let ipm_coin = await IPMCoin.deployed();

        let balance_one_before = await ipm_coin.balanceOf.call(account_one);
        let total_supply_bef = await ipm_coin.totalSupply.call();

        await ipm_coin.burnFrom(account_one, amount_to_burn, {from:account_three});

        let balance_one_aft = await ipm_coin.balanceOf.call(account_one);
        assert.equal(balance_one_aft, balance_one_before - amount_to_burn, "Account one changed failed!");

        let total_supply_aft = await ipm_coin.totalSupply.call();
        assert.equal(total_supply_aft.toNumber(), total_supply_bef - amount_to_burn, "Total supply should be changed!");

    });

    //------function mintToken(address target, uint256 mintedAmount) onlyOwner public
    it('should mint coins success!', async () => {
        var account_two   = accounts[1];

        var amunt = 1e8;

        let ipm_coin = await IPMCoin.deployed();

        let balance_two_b = await ipm_coin.balanceOf(account_two);
        let total_supply_b = await ipm_coin.totalSupply.call();

        await ipm_coin.mintToken(account_two, amunt);

        let balance_two_a = await ipm_coin.balanceOf(account_two);
        let total_supply_a = await ipm_coin.totalSupply.call();

        assert.equal(balance_two_a.toNumber(), balance_two_b.toNumber() + amunt, "Account two changed failed!");
        assert.equal(total_supply_a.toNumber(), total_supply_b.toNumber() + amunt, "Total supply changed failed!");
    });


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