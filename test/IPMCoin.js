var IPMCoin = artifacts.require("./IPMCoin.sol");

contract('IPMCoin', function(accounts) {


    //------function getBalanceOf(address target) public view returns (uint256)-------
    it("should put 1e+28 MetaCoin in the first account", function() {
        return IPMCoin.deployed().then(function(instance) {
            return instance.getBalanceOf.call(accounts[0]);
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

        var amount = 5e16;

        return IPMCoin.deployed().then(function(instance) {
            ipm = instance;
            return ipm.getBalanceOf.call(account_one);
        }).then(function(balance) {
            account_one_starting_balance = balance.toNumber();
            return ipm.getBalanceOf.call(account_two);
        }).then(function(balance) {
            account_two_starting_balance = balance.toNumber();
            return ipm.transfer(account_two, amount, {from: account_one});
        }).then(function() {
            return ipm.getBalanceOf.call(account_one);
        }).then(function(balance) {
            account_one_ending_balance = balance.toNumber();
            return ipm.getBalanceOf.call(account_two);
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
});