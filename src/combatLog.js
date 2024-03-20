import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useRef, useState, useEffect } from "react";

export function DrawingCombatLog(props) {
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);

    props.gameServer.onEvent("CombatMessage", response => {
        // Add message to the list of messages
        setMessages([...messages, response]);
    });

    // Scroll to the bottom of the chat box whenever new messages are added
    useEffect(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);

    return (
        <>
            <h4>CombatLog</h4>
            <div
                style={{
                    height: "150px", // Set the height of the chat box
                    width: "calc(80%)",// set the widht to 50% of screen size
                    overflowY: "auto", // Enable vertical scrolling for overflow content
                    border: "1px solid #ccc",
                    marginBottom: "20px" // Optional: Add some margin at the bottom
                }}
                ref={chatBoxRef} // Reference to the chat box div for scrolling
            >
                {/* Display messages */}
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </>
    );
}

