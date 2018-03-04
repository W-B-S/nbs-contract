pragma solidity ^0.4.18;

import "./TokenERC20.sol";
import "./SafeMath.sol";
import "./Pausable.sol";

contract IPMCoin is SafeMath, StandardToken, Pausable{

    uint256 public initSupply = 1e10;
    uint256 public sellPrice;
    uint256 public buyPrice; 

	function IPMCoin(
        string tokenName,
        string tokenSymbol) 
        StandardToken(initSupply, tokenName, tokenSymbol)
        public {
	}

    function mintToken(address target, uint256 mintedAmount) onlyOwner public {
        balanceOf[target] += mintedAmount;
        totalSupply += mintedAmount;
        Transfer(0, this, mintedAmount);
        Transfer(this, target, mintedAmount);
    }

    function freezeAccount(address target, bool freeze) onlyOwner public {
        frozenAccount[target] = freeze;
        FrozenFunds(target, freeze);
    }

    function setPrices(uint256 newSellPrice, uint256 newBuyPrice) onlyOwner public {
        sellPrice = newSellPrice;
        buyPrice = newBuyPrice;
    }

    function buy() payable public {
        uint amount = msg.value / buyPrice;               // calculates the amount
        super.transferFrom(this, msg.sender, amount);     // makes the transfers
    }

    function sell(uint256 amount) public {
        require(this.balance >= amount * sellPrice);      // checks if the contract has enough ether to buy
        super.transferFrom(msg.sender, this, amount);     // makes the transfers
        msg.sender.transfer(amount * sellPrice);          // sends ether to the seller. It's important to do this last to avoid recursion attacks
    }

	function transfer(address _to, uint _value) whenNotPaused public returns (bool success) {
        return super.transfer(_to, _value);
    }

    function approve(address _spender, uint _value) whenNotPaused public returns (bool success) {
        return super.approve(_spender,_value);
    } 
}