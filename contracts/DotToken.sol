// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DotToken is ERC20 {
    constructor() public ERC20("Pacmans food", "DOT") {
        uint256 initialSupply = 1000000 * 10 ** 18;
        _mint(msg.sender, initialSupply);
    }
}