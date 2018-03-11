pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/IPMCoin.sol";
import "../contracts/ConvertLib.sol";

contract TestIPMCoin {
    // uint8 public decimals = 18;
    //
    // function testInitialBalanceUsingDeployedContract() public {
    //
    //     IPMCoin ipm = IPMCoin(DeployedAddresses.IPMCoin());
    //
    //     uint expected = ConvertLib.convert(1e10, 10 ** uint256(decimals));
    //
    //     Assert.equal(ipm.getBalanceOf(0x627306090abaB3A6e1400e9345bC60c78a8BEf57),
    //         expected, "Owner should have 1e10 IPMCoin initially");
    // }
    //
    // function  testTransfer() public {
    //         IPMCoin ipm = IPMCoin(DeployedAddresses.IPMCoin());
    //
    //         bool result = ipm.approve(0xf17f52151EbEF6C7334FAD080c5704D77216b732, 5e9 * 10**uint256(decimals));
    //
    //         Assert.equal(result, true, "Should approve success");
    // }
}
