pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/IPMCoin.sol";

contract TestIPMCoin {

  function testInitialBalanceUsingDeployedContract() public {
    IPMCoin meta = IPMCoin(DeployedAddresses.IPMCoin());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 3000000000 IPMCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    IPMCoin meta = new IPMCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 3000000000 IPMCoin initially");
  }

}
