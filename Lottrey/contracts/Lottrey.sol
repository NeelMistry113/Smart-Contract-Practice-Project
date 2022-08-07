// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Lottrey{
    address public manager;
    address payable[] public participants;

    constructor()
    {
        manager = msg.sender;
    }

    receive() external payable
    {
        require(msg.value== 0.1 ether);
        participants.push(payable(msg.sender)); 
    }

    function checkBalance() public view returns(uint)
    {
        require(msg.sender== manager);
        return address(this).balance;
    }

    function randomSelection() public view returns(uint)
    {
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,participants.length)));
    }

    function selectWiner() public
    {
        require(msg.sender==manager);
        require(participants.length>=3);
        uint r = randomSelection();
        address payable winner;
        uint index = r % participants.length;
        winner = participants[index];
        winner.transfer(checkBalance()/2);
        participants=new address payable[](0);
    }
}