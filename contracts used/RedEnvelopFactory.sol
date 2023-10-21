// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;
import "./RedEnvelope.sol";
import "hardhat/console.sol";
contract RedEnvelopeFactory {
    mapping (address => RedEnvelope[]) createdEnvelopes;
    function createRedEnvelope(string memory _greeting, uint8 _count, bytes32[] memory _valid_hashes) external payable{
        // Ensure the sender has sent some Ether
        require(msg.value > 0, "No Ether sent");
        require(_count == _valid_hashes.length);


        // Create the new RedEnvelope contract
        uint256 envelopeBalance = address(this).balance;
        RedEnvelope newEnvelope = new RedEnvelope{value: envelopeBalance}(_greeting, _count,msg.sender, _valid_hashes);
        createdEnvelopes[msg.sender].push(newEnvelope);
        // Debugging puroses only
        console.log("%s", address(newEnvelope));
    }

    function getEnvelopes() public view returns (RedEnvelope[] memory) {
        return createdEnvelopes[msg.sender];
    
        // --- end ---
    }
    function getLatest() public view returns (RedEnvelope) {
        RedEnvelope[] memory envs = createdEnvelopes[msg.sender];
        require(envs.length > 0);
        return envs[envs.length - 1];
        
    }
}