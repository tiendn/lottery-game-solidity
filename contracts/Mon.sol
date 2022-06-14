// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC20.sol';

contract Mon is ERC20 {
  constructor() ERC20('MON', 'Monkey') {}

  function faucet(address to, uint amount) external {
    require(to != address(0), 'ERC20: cannot mint to address null');
    _mint(to, amount);
  }
}