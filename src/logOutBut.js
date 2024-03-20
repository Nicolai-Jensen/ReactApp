import React from "react";

export function LogOutButton(props) {

    function handleClick(){
        props.gameServer.disconnect()
        console.log("disconnect has been done")
    }
    return (
        <>
            <button onClick={handleClick}>LogOut</button>
        </>
    );
}

