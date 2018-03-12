var IPMCoin = artifacts.require("./IPMCoin.sol");

contract('IPMCoin', function(accounts) {


    //------function balanceOf(address target) public view returns (uint256)-------
    it("should put 1e+28 MetaCoin in the first account", function() {
        return IPMCoin.deployed().then(function(instance) {
            return instance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.valueOf(), 1e+28, "1e+28 wasn't in the first account");
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

        var amount = 1e+27;

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
            return ipm_coin.approve.call(account_two, 4.5e+22);
        }).then(function (result) {
            assert.equal(result, true, "Failed to approve amount from owner to account 2");
        });
    });

    it('should successfully Transfer amount of ipm from a to b', function () {
        var ipm_coin;
        var account_one   = accounts[0];
        var account_two   = accounts[1];
        var account_three = accounts[2];

        var account_one_ending_balance;
        var account_two_ending_balance;

        return IPMCoin.deployed().then(function (instance) {

            ipm_coin = instance;
            return ipm_coin.approve(account_three, 5e+27, {from: account_one});

        }).then(function (ret) {
            // console.log("approve:" + JSON.stringify(ret));
            return ipm_coin.transferFrom(account_one, account_two, 2e+27, {from:account_three});

        }).then(function (ret) {
            // console.log("transferFrom:" + JSON.stringify(ret));
            return ipm_coin.balanceOf.call(account_one);

        }).then(function (balance) {

            account_one_ending_balance = balance.toNumber();
            return ipm_coin.balanceOf.call(account_two);

        }).then(function (balance) {
            account_two_ending_balance = balance.toNumber();

            assert.equal(account_one_ending_balance, 7e27,"Amount wasn't correctly taken from the accont one.");
            assert.equal(account_two_ending_balance, 3e27,"Amount wasn't correctly received by account two.");
        });
    });
});