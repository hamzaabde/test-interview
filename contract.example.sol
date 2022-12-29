// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Test {
    string private value = "";

    function read() external view returns (string memory) {
        return value;
    }

    function write(string memory _value) external {
        value = _value;
    }
}
