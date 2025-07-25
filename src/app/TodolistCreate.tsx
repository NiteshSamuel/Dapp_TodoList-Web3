import React, { Key, useContext } from 'react'
import { TodoListContext } from '../../context/TodoList'
import { Indexed } from 'ethers';



const TodolistCreate = (myList:any) => {
console.log(myList);
  return (
    <div>
      {myList.length ===0 ? (<div>No Data </div>) :(
        <div >
          {/* {
            myList.map((el,i)=>(
              <div key={i+1}>
                <p>{el[2]}</p>
              </div>
            ))
          } */}
          </div>
      )

      }
    </div>
  )
}

export default TodolistCreate
