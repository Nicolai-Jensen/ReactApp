import React from "react"
import {Login} from "./Login"

export function App(props){
    return(
        <>
            <DrawGameWorld/>
            <Login/>
        </>
    );
}
let game = "John Cena"
function DrawGameWorld(){
    return(
        <>
            <h1>Title of the is {game}</h1>
        </>
    )
}