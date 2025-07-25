// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


contract TodoList{
    address public owner;
    
    struct ToList{
        address author;
        string content;
        bool completed;
        uint256 id;
    }

    mapping (address =>ToList[]) public lists;
    
    constructor(){
        owner=msg.sender;
    
    }

    function createTodoList(string memory _content) public {
        ToList memory newTolist=ToList({
            author:msg.sender,
            content:_content,
            completed:false,
            id:lists[msg.sender].length 
        });
        lists[msg.sender].push(newTolist);
    }

    function getTodoList(address _owner) public view returns (ToList[] memory){
        return lists[_owner];
    }

    function  getOwner() public view returns  (address){ 
        return owner;
    }

    function toggleList(address author,uint256 _id) external {
        require(lists[author][_id].id==_id, "The list does not exist!");
        if(lists[author][_id].completed ==false){
            lists[author][_id].completed =true;
        }else{
        lists[author][_id].completed =false;
        }
    }

    function getBalance() public view returns (uint256){
        return (msg.sender).balance;
    }
}