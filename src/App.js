import { useReducer } from 'react'
import "./App.css"
import DigitButton from './digitButton'
import OperationButton from './operationButton'



export const ACTION = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete',
  EVALUATE: 'evaluate'
}

// Dispatch will give/pass value to the reducer function to do work!

function reducer(state, { type, payload }) { // type is a string and payload is a object inside the object!!!

  switch (type) {
    case ACTION.ADD_DIGIT:
      if(state.overwrite) {
        return{
          ...state,
          currOperand:payload.digit,
          overwrite:false
        }
      }
      if (payload.digit === "0" && state.currOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currOperand.includes(".")) {
        return state;
      }
      return {          // this will return a datatype of which we've passed to the useReducer 
        ...state,           // we are gonna return a new state object here
        currOperand: `${state.currOperand || ""}${payload.digit}` // we'll use state.currOperand s state is an object!!!
        // here we are adding a digig to the end (when we do a typing digit just concate from backwards)
        //Here we are just adding/concating two strings , when we use dispatch!//we'll pass payload.dogit to the reducer
      }
    case ACTION.CLEAR: return {

    }
    case ACTION.CHOOSE_OPERATION:
      if (state.currOperand == null && state.prevOperand == null) return state;
      if (state.currOperand==null) {
        return {
          ...state,
          operation:payload.operation
        }
      }
      if (state.prevOperand == null) return {
        ...state,
        operation: payload.operation,
        prevOperand: state.currOperand,
        currOperand: null
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: state.operation,
        currOperand: null,

      }

    case ACTION.EVALUATE:
      if(state.operation==null || state.prevOperand==null || state.currOperand==null){
        return{
          state
        }
      }
      return{
        ...state,
        prevOperand:null,
        overwrite:true,
        operation:null,
        currOperand:evaluate(state)

      }

    case ACTION.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          overwrite:false,
          currOperand:null
        }
      }

      if(state.currOperand==null) return{state};
      if(state.currOperand.length===1){
        return{
          ...state,
          currOperand:null
        }
      }
      return{
      ...state,
      currOperand:state.currOperand.slice(0,-1)
      }


  }
}

function evaluate({ currOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand); //parseFloat() picks the longest substring starting from the beginning that generates a valid number literal
  const cur = parseFloat(currOperand);

  if (isNaN(prev) || isNaN(cur)) {
    return "";

  }

  let computation = "";
  switch (operation) {
    case "+":{ 
      computation = prev + cur;
      break;
    }
    case "-":{ 
      computation = prev - cur;
      break;
    }
    case "*":{ 
      computation = prev * cur;
      break;
    }
    case "/":{ 
      computation = prev / cur;
      break;
    }

  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  const [{ currOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {});


  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(prevOperand)} {operation} </div>
        <div className="current-operand">{formatOperand(currOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTION.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTION.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTION.EVALUATE })}>=</button>

    </div>
  );
}

export default App;
