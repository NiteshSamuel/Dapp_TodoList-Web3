'use client'
import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import Web3modal from "web3modal";


// Import the interal packages
import {todoListAddress, todoABI} from "./costant";

const fetchContract = (signOrProvider)=> new ethers.Contract(todoListAddress,todoABI,signOrProvider);





export const TodoListContext =new React.createContext();



export const TodoList = ({children}) => {
    
    
    const [currentAddress, setcurrentAddress]=new useState();
    const [error, seterror]= useState("");
    const [balance, setbalance]= useState();
    const [currentAccount, setcurrentAccount] = new useState("");
    const [myList, setmyList]= new useState([]);



const checkIfWalletIsConnected =async() =>{
    if(!window.ethereum) return seterror("Please install metamask!");
    
    const account = await window.ethereum.request({method: 'eth_accounts'});

    if(account.length){
        setcurrentAccount(account[0]);
        console.log(account[0]);
    }else{
        seterror("please install metamask and reload the account if it's not working ");
    }

}


const connectWallet = async() =>{
    if(!window.ethereum) return seterror("Please install metamask!");
    
    const account = await window.ethereum.request({method: 'eth_accounts'});
        setcurrentAccount(account[0]);
    
}


const todoListContract =async() =>{
    try{
        const webmodal= new Web3modal();
        const connect =await webmodal.connect();
        const provider=new ethers.BrowserProvider(connect);
        
        const signer = await provider.getSigner();
        const contract= await fetchContract(signer);
        const bal =await contract.getBalance();
        const ad = await contract.getOwner();
        setbalance(bal);
       // setcurrentAccount(ad);

    //    ad.map(async(el)=>{
    //     const getSingleData =await contract.getTodoList(el);
    //     myList.push(getSingleData);
    //     console.log(getSingleData);
    //    })

        const allMessage= await contract.getTodoList(ad);
        setmyList(allMessage);

    }catch(e){
        console.log(e);
        console.log("Something went wrong!!");
    }
};

const onCompleteList = async (address) =>{
    try {
        const webmodal= new Web3modal();
        const connect =await webmodal.connect();
        const provider=new ethers.BrowserProvider(connect);
        
        const signer = await provider.getSigner();
        const contract= await fetchContract(signer);

        const state =await contract.toggleList(address);
        state.wait();

        //console.log(state);

    }catch(e){
        console.log("something went wrong when togggling the list see the logs:::"+e);
    }
}

const createTodoList = async(message)=>{
try{
    const webmodal= new Web3modal();
        const connect =await webmodal.connect();
        const provider=new ethers.BrowserProvider(connect);
        
        const signer = await provider.getSigner();
        const contract= await fetchContract(signer);


        const value= await contract.createTodoList(message);
        value.wait();
        console.log(message);

}catch(e){
console.log("while creating new list something went wrong ! see logs::: "+e);
}
}

useEffect(()=>{
    checkIfWalletIsConnected();
    connectWallet();
    todoListContract();
})



  return (
    <TodoListContext.Provider value = {{todoListContract, connectWallet, checkIfWalletIsConnected, balance, currentAccount, myList, createTodoList, onCompleteList}}>
        {children}

    </TodoListContext.Provider>
  )
}

export default TodoList;
