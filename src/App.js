import {useReducer} from 'react'
import "./App.css"
import DigitButton from './digitButton'



export const ACTION={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose',
  CLEAR:'clear',
  DELETE_DIGIT:'delete',
  EVALUATE:'evaluate'
}

// Dispatch will give/pass value to the reducer function to do work!

function reducer(state,{type,payload}) { // type is a string and payload is a object inside the object!!!
  switch(type){
    case ACTION.ADD_DIGIT:
      return{          // this will return a datatype of which we've passed to the useReducer 
            ...state,           // we are gonna return a new state object here
            currOperand: `${currOperand || ""}${payload.digit}` //
            // here we are adding a digig to the end (when we do a typing digit just concate from backwards)
            //Here we are just adding/concating two strings , when we use dispatch!//we'll pass payload.dogit to the reducer
      }
  }
}

function App() {

  const [{currOperand,prevOperand,operation},dispatch]=useReducer(reducer,{});

  dispatch({type:ACTION.ADD_DIGIT , payload:{digit:1}})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{prevOperand} {operation} </div>  
           <div className="current-operand">{currOperand}</div>  
          </div>
          <button className="span-two">AC</button>        
          <button>DEL</button>
          <button>/</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>*</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>+</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>-</button>
          <button>.</button>
          <button>0</button>
          <button className="span-two">=</button>
      
    </div>
  );
}

export default App;
