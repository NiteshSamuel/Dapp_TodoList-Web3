'use client'

import { useState,useEffect } from "react";
import { ethers } from "ethers";
import TodolistCreate from "./TodolistCreate";


//internal import
import {TodoListContext} from "../../context/TodoList";

import { useContext } from "react";
import { AppProps } from "next/app";
import { Meera_Inimai } from "next/font/google";

export default function App({Component, pageProps}: AppProps){

  const {todoListContract, connectWallet, checkIfWalletIsConnected, balance, currentAccount, myList, createTodoList, onCompleteList}:any = useContext(TodoListContext );

  const [message, setMassage]= useState("");
  return (<>
  <div>
    {
      !currentAccount? (<button onClick={()=>{}}>connect Wallent</button>) :(<button onClick={()=>{connectWallet()}}>{currentAccount.slice(0,30)}..</button>)
    }
  </div>
  <div className="Home_box">
    <div className="Home_list">
      <h2>Complete Todo List</h2>
      <div>
        {/* {myList.map((el:any, i:any)=>{
          <div className="ItemList"><p>{el}</p></div>
        })} */}
      </div>
    </div>
  </div>
      <h2 className="TodoHeader">Create Blockchain Todo List</h2>
      <div>
      <input type='Text' className= "InputText"placeholder='Enter your To Do!' onChange={(e)=>{
        setMassage(e.target.value)
      }}  />
      {
        currentAccount ? (<button onClick={()=>{createTodoList(message)}}>Create To DO!</button>) : (<button onClick={()=>{connectWallet()}}>connect wallet</button>)
}
</div>
{console.log(message)}
 <TodolistCreate myList={myList}/>
  </>);
}