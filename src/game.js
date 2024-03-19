import React from "react"
import useGameServer from "./useGameServer";
import { DrawingChatBox } from "./ChatBoxs";
import {World} from "./visual"

export function GameState(props) {
    const { token } = props;
    const gameServer = useGameServer("http://react.tsanas.com/gamehub", token, handleConnectionClosed);

    return (
        <>
        <World />
        <DrawingChatBox gameServer = {gameServer}/>
        </>
    )
}


function handleConnectionClosed (error) {
    console.error("Connection to game server closed:", error);
};


