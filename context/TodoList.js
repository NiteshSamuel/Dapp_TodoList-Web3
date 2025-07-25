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
        setcurrentAccount(ad);
        


    }catch(e){
        console.log(e);
        console.log("Something went wrong!!");
    }
};

useEffect(()=>{
   console.log(fetchContract);
    checkIfWalletIsConnected();
    connectWallet();
    todoListContract();
})



  return (
    <TodoListContext.Provider value = {{todoListContract, connectWallet, checkIfWalletIsConnected, balance, currentAccount}}>
        {children}

    </TodoListContext.Provider>
  )
}

export default TodoList;
