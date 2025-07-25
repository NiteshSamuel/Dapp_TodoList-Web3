'use client'

import { useEffect } from "react";
import { ethers } from "ethers";
import TodolistCreate from "./TodolistCreate";


//internal import
import {TodoListContext} from "../../context/TodoList";

import { useContext } from "react";
import { AppProps } from "next/app";

export default function App({Component, pageProps}: AppProps){

  const {todoListContract, connectWallet, checkIfWalletIsConnected, balance, currentAccount}:any = useContext(TodoListContext );
  return (<>
  <div>
    {
      !currentAccount? (<button onClick={()=>{}}>connect Wallent</button>) :(<button onClick={()=>{connectWallet()}}>{currentAccount}..</button>)
    }
  </div>
  <div className="Home_box">
    <div className="Completed_section">
      <h2>Complete Todo List</h2>
      <div>
      </div>
    </div>
  </div>
      <h2 className="TodoHeader"> Todo List</h2>
      <input type='Text' className= "InputText"placeholder='Please enter whats needs to be done!'  />
      <button className="CreateList" onClick={()=>{}}>Create a Todo</button>
 <TodolistCreate/>
  </>);
}