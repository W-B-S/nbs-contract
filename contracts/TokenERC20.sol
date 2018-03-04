pragma solidity ^0.4.18;

import "./SafeMath.sol";

// ================= ERC20 Token Contract start =========================
/*
 * ERC20 interface
 * see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 {
  uint public totalSupply;  

  function transfer(address to, uint value) public returns (bool ok);
  function transferFrom(address from, address to, uint value) public returns (bool ok);
  function approve(address spender, uint value) public returns (bool ok);
  event Burn(address indexed from, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  event FrozenFunds(address target, bool frozen);
}
// ================= ERC20 Token Contract end ===========================

// ================= Standard Token Contract start ======================
interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public; }

contract StandardToken is ERC20, SafeMath {

    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
  /**
  * @dev Fix for the ERC20 short address attack.
   */
  modifier onlyPayloadSize(uint size) {
    require(msg.data.length >= size + 4) ;
    _;
  }

  mapping(address => uint) public balanceOf;
  mapping (address => mapping (address => uint)) public allowed;
  mapping (address => bool) public frozenAccount;


  function StandardToken(
        uint256 initialSupply,
        string tokenName,
        string tokenSymbol
    ) public {
        totalSupply = initialSupply * 10 ** uint256(decimals);  // Update total supply with the decimal amount
        balanceOf[msg.sender] = totalSupply;                // Give the creator all initial tokens
        name = tokenName;                                   // Set the name for display purposes
        symbol = tokenSymbol;                               // Set the symbol for display purposes
    }

    function transfer(address _to, uint _value) onlyPayloadSize(2 * 32) public returns (bool success){

      require(!frozenAccount[_to]);

      balanceOf[msg.sender] = safeSubtract(balanceOf[msg.sender], _value);
      balanceOf[_to] = safeAdd(balanceOf[_to], _value);
      Transfer(msg.sender, _to, _value);
      return true;
    }

    function transferFrom(address _from, address _to, uint _value) onlyPayloadSize(3 * 32) public returns (bool success) {
      require(!frozenAccount[_from]);
      require(!frozenAccount[_to]);

      var _allowance = allowed[_from][msg.sender];

      balanceOf[_to] = safeAdd(balanceOf[_to], _value);
      balanceOf[_from] = safeSubtract(balanceOf[_from], _value);
      allowed[_from][msg.sender] = safeSubtract(_allowance, _value);
      Transfer(_from, _to, _value);
      return true;
    }

    function approve(address _spender, uint _value) public returns (bool success) {
      allowed[msg.sender][_spender] = _value;
      Approval(msg.sender, _spender, _value);
      return true;
    } 

    function approveAndCall(address _spender, uint256 _value, bytes _extraData)
        public
        returns (bool success) {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, this, _extraData);
            return true;
        }
    }

    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);   // Check if the sender has enough
        balanceOf[msg.sender] -= _value;            // Subtract from the sender
        totalSupply -= _value;                      // Updates totalSupply
        Burn(msg.sender, _value);
        return true;
    }

    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value); 
        require(_value <= allowed[_from][msg.sender]); 
        balanceOf[_from] -= _value; 
        allowed[_from][msg.sender] -= _value;     
        totalSupply -= _value; 
        Burn(_from, _value);
        return true;
    }
}
// ================= Standard Token Contract end ========================
