import React from "react";
import useGameServer from "./useGameServer";
import { DrawingChatBox } from "./ChatBoxs";
import { DrawingCombatLog } from "./combatLog";
import { World } from "./visual";

export function GameState(props) {
    const { token } = props;
    const gameServer = useGameServer("http://react.tsanas.com/gamehub", token, handleConnectionClosed);
    gameServer.connect();

    return (
        <>
            <World gameServer={gameServer} />
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

