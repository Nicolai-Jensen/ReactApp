import React from "react";
import useGameServer from "./useGameServer";
import { DrawingChatBox } from "./ChatBoxs";
import { DrawingCombatLog } from "./combatLog";
import { World } from "./visual";
import { LogOutButton } from "./logOutBut";

export function GameState(props) {
    const { token } = props;
    //const {loginSucc} = props.loginSuc
    const gameServer = useGameServer("http://react.tsanas.com/gamehub", token, handleConnectionClosed);
    gameServer.connect();
    document.title = "ReactGame";

    return (
        <>
            <World gameServer={gameServer} />
            <LogOutButton/>
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
function handleConnectionClosed(error) {
    console.error("Connection to game server closed:", error);
}



