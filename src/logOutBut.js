import React from "react";

export function LogOutButton(props) {
    const { handleDisError, gameServer } = props;

    const handleLogout = () => {
        // Call handleDisError function when logout button is clicked
        gameServer.disconnect();
        handleDisError();
    };

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
}
