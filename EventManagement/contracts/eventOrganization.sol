// SPDX-License-Identifier: UNIDENTIFIER

pragma solidity ^0.8.9;

contract EventOrganization
{
    struct Event
    {
        address organizer;
        string Eventname;
        uint date;
        uint price;
        uint ticketCount;
        uint ticketRemain;
    }

    mapping(uint=>Event) public events;
    mapping(address=>mapping(uint=>uint)) public tickets;
    uint public nextID;

    function createEvent(string memory Eventname, uint date, uint price, uint ticketCount) external
    {
        require(date>block.timestamp,"You can organize event for future date");
        require(ticketCount>0,"You can organize event only if you create more the 0 tickets");

        events[nextID]= Event(msg.sender, Eventname, date, price, ticketCount, ticketCount);
        nextID++;
    }

    function buyTicket(uint id, uint quantity) external payable
    {
        require(events[id].date != 0, "This Event does not exisit");
        require(events[id].date>block.timestamp, "Event has already occured");
        Event storage _event = events[id];
        require(msg.value==(_event.price*quantity),"Ether paymet not match to the event tickets price.");
        require(_event.ticketRemain>=quantity, "Not Enough tickets");
        _event.ticketRemain-= quantity;
        tickets[msg.sender][id]+=quantity;
    }

    function transferTicket(uint id, uint quantity, address to) external {
        require(events[id].date != 0, "This event does not exisit");
        require(events[id].date>block.timestamp, "Event has already occured");
        require(tickets[msg.sender][id]> quantity,"you do not have enough tickes");
        tickets[msg.sender][id]-= quantity;
        tickets[to][id]+= quantity;
    }
}