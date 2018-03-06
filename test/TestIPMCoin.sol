pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/IPMCoin.sol";

contract TestIPMCoin {

  function testInitialBalanceUsingDeployedContract() public {
    IPMCoin meta = IPMCoin(DeployedAddresses.IPMCoin());

    uint expected = 1e10;

    Assert.equal(meta.getBalanceOf(0x627306090abaB3A6e1400e9345bC60c78a8BEf57), expected, "Owner should have 1e10 IPMCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    IPMCoin meta = new IPMCoin();

    uint expected = 1e10;

    Assert.equal(meta.getBalanceOf(tx.origin), expected,
        "Owner should have 1e10 IPMCoin initially");
  }

}
