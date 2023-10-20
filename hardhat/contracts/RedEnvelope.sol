//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "hardhat/console.sol";

struct transaction_details {
    address receiver;
    uint amt;
    uint time;
}

contract RedEnvelope {
    transaction_details[] transactions;
    mapping(address => bool) blacklist;
    uint8 private count = 0;
    uint8 private max_count = 2;
    uint private randNonce;
    string public greeting;
    address private owner;
    bytes32[] private valid_hashes;

    constructor(
        string memory _greeting,
        uint8 _count,
        address _owner,
        bytes32[] memory _valid_hashes
    ) payable {
        greeting = _greeting;
        max_count = _count;
        randNonce = max_count;
        owner = _owner;
        valid_hashes = _valid_hashes;
    }

    function view_balance() public view returns (uint) {
        return address(this).balance;
    }

    function randNo() private returns (uint) {
        randNonce++;
        return
            uint(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % 50;
    }

    function isValidPass(string memory pass) private returns (bool) {
        for (uint i = 0; i < valid_hashes.length; i++) {
            if (valid_hashes[i] == keccak256(abi.encodePacked(pass))) {
                valid_hashes[i] = 0;
                return true;
            }
        }
        return false;
    }

    function claim(string memory _pass) public {
        require(count < max_count);
        require(address(this).balance > 0, "Not enough balance");
        require(blacklist[msg.sender] != true);
        require(isValidPass(_pass), "Invalid Link");

        uint bal = address(this).balance;
        if (count + 1 != max_count) {
            bal = (randNo() * bal) / 100;
        }
        payable(msg.sender).transfer(bal);
        transactions.push(
            transaction_details(msg.sender, bal, block.timestamp)
        );
        blacklist[msg.sender] = true;
        count++;
    }

    function getTxn() public view returns (transaction_details[] memory) {
        require(msg.sender == owner);
        return transactions;
    }

    function getAmt() public view returns (uint) {
        transaction_details memory txn;
        for (uint i = 0; i < transactions.length; i++) {
            txn = transactions[i];
            if (txn.receiver == msg.sender) {
                return txn.amt;
            }
        }
        return 0;
    }
}
