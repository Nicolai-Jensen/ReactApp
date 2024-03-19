import React, { useState } from "react";

export function DrawingChatBox(props){
    const [gameServer, SetGameServer] = useGameServer(
        "http://react.tsanas.com/gamehub", 
        this.props.state.token, 
        this.props.state.handleConnectionClosed
        ); 
    
    return(
        <>
            <h1>CHAT BOX STUFF</h1>
        </>
    );
}