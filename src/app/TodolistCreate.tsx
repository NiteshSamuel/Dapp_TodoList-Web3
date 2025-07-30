import React, { Key, useContext } from 'react'
import { TodoListContext } from '../../context/TodoList'
import { Indexed } from 'ethers';
import './todollisthome.css';
import { Card } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import DoneIcon from '@mui/icons-material/Done';
import { boolean } from 'hardhat/internal/core/params/argumentTypes';



const TodolistCreate = ({myList}:any) => {
  const {onCompleteList}:any =useContext(TodoListContext);
//console.log(myList);
  return (
    <div className="ItemContainer">
      {myList.length ===0 ? (<div className="NoItem">No Data </div>) :(
        <ListGroup className="ItemList">
          {
            myList.map((el:any,i:any)=>(
              <ListGroup.Item className={el[2] ? 'strikethrough':'item'} action  variant="dark" key={i+1}>
                <p className="itemValue">{el[1]}</p>
                {el[2]===false ? (
                <DoneIcon className="doneIcon" onClick={()=>{onCompleteList(el[0],i);
                  console.log("this is the id of the item: "+el[0]);
                }}/>) :(<p className="listItemDone">DOWN</p>)
                }
              </ListGroup.Item>
            ))
          }
          </ListGroup>
      )

      }
    </div>
  )
}

export default TodolistCreate
