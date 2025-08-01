'use client'

import { useState,useEffect } from "react";
import { ethers } from "ethers";
import TodolistCreate from "./TodolistCreate";



//internal import
import {TodoListContext} from "../../context/TodoList";
import './todollisthome.css';

import { useContext } from "react";
import { AppProps } from "next/app";
import { Meera_Inimai } from "next/font/google";
import { Button } from "react-bootstrap";

export default function App({Component, pageProps}: AppProps){

  const {todoListContract, connectWallet, checkIfWalletIsConnected, balance, currentAccount, myList, createTodoList, onCompleteList}:any = useContext(TodoListContext );

  const [message, setMassage]= useState("");
  return (<>
  <div className="wholePage">
   <div className="ButonContainer">
    {
      !currentAccount? (<Button variant="primary" onClick={()=>{connectWallet()}}>connect Wallent</Button>
      ) :(<><Button variant="success" onClick={()=>{connectWallet()}}>{currentAccount.slice(0,30)}..</Button>
      <div className="balanceContainer">Balance: {String(balance).slice(0,10)}... ETH </div>
      </>)
    }
  </div>
  <div className="todoListContainer">
      <h2 className="TodoHeader">DApp: Create BlockChain Todo List!</h2>
      <div>
      <input type='Text' className= "InputText"placeholder='Enter your To Do!' onChange={(e)=>{
        setMassage(e.target.value)
      }}  />
      {
        currentAccount ? (<Button variant="success" onClick={()=>{createTodoList(message)}}>Create To DO!</Button>) : (<Button variant="primary" onClick={()=>{connectWallet()}}>connect wallet</Button>)
}
</div>

 <TodolistCreate myList={myList}/>
 </div>
 </div>
  </>);
}