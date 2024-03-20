import React, { useState, useEffect } from "react";

export function Controls(props) {
    const gameServerObj = props.gameServer
    const [canPerformAction, setCanPerformAction] = useState(true);

    const handleKeyPress = (event) => {
        if (!canPerformAction) return;

        if (event.key === "w") {
            invokeMethod("MoveDirection", "up");
        }
        if (event.key === "s") {
            invokeMethod("MoveDirection", "down");
        }
        if (event.key === "a") {
            invokeMethod("MoveDirection", "left");
        }
        if (event.key === "d") {
            invokeMethod("MoveDirection", "right");
        }
        if (event.key === "e") {
            invokeMethodAttack("Attack");
        }
    };


    const invokeMethod = (command, value) => {
        if (!canPerformAction) return;
        console.log(value)
        setCanPerformAction(false);
        gameServerObj.invoke(command, value);
        setTimeout(() => setCanPerformAction(true), 150);     
    }

    const invokeMethodAttack = (command) => {
        if (!canPerformAction) return;
        console.log(command)
        setCanPerformAction(false);
        gameServerObj.invoke(command);
        setTimeout(() => setCanPerformAction(true), 250);     
    }

    

    useEffect(() => {
        const handleKeyDown = (event) => {
            handleKeyPress(event);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyPress]);

    return null;
}