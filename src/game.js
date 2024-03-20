import React from "react";
import useGameServer from "./useGameServer";
import { DrawingChatBox } from "./ChatBoxs";
import { DrawingCombatLog } from "./combatLog";
import { LogOutButton } from "./logOutBut";
import { World } from "./visual"
import { Controls } from "./controls";

export function GameState(props) {
    const { token, handleDisError } = props;
    //const {loginSucc} = props.loginSuc
    const gameServer = useGameServer("http://react.tsanas.com/gamehub", token, handleConnectionClosed);
    gameServer.connect();
    document.title = "ReactGame";


    function handleConnectionClosed(error) {
        //gameServer.disconnect();
        handleDisError();
        console.error("Connection to game server closed:", error);
    }
    return (
        <>
            <World gameServer={gameServer} />
            <Controls gameServer={gameServer} />
            <LogOutButton handleDisError={handleDisError} gameServer={gameServer} />
            <div className="container">
                <div className="box-container">
                    <DrawingChatBox gameServer={gameServer} />
                </div>
                <div className="box-container">
                    <DrawingCombatLog gameServer={gameServer} />
                </div>
            </div>
        </>
    );
}



