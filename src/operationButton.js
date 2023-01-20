import {ACTION} from './App.js'

export default function Buttons({dispatch,operation}){
return( 
<button onClick={()=> dispatch({type:ACTION.CHOOSE_OPERATION,payload:{operation}})}>{operation}</button>
)

}