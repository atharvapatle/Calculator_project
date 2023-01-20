import {ACTION} from './App.js'

export default function Buttons({dispatch,digit}){
return <button onClick={()=> dispatch({type:ACTION.ADD_DIGIT,digit})}>{digit}</button>

}