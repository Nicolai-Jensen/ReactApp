import React from "react"

export function App(props){
    return(
        <>
            <DrawGameWorld/>
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