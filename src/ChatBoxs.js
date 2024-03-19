import React, { useRef, useState, useEffect } from "react";

export function DrawingChatBox(props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);

    const handleMessageChange = (event) => {
        var tmp = event.target.value
        if(tmp.length >= 100){
            return;
        }
        else{
            setMessage(event.target.value);
        }

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim() !== "") {
            props.gameServer.invoke("Chat", message)
            // Clear the input field
            setMessage("");
        }
    };
    props.gameServer.onEvent("ChatMessage", response => {
        // Add message to the list of messages
        setMessages([...messages, response]);
    });

    // Scroll to the bottom of the chat box whenever new messages are added
    useEffect(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);

    return (
        <>
            <h4>ChatBox</h4>
            <div
                style={{
                    height: "150px", // Set the height of the chat box
                    width: "calc(50%)",// set the widht to 50% of screen size
                    overflowY: "auto", // Enable vertical scrolling for overflow content
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "20px" // Optional: Add some margin at the bottom
                }}
                ref={chatBoxRef} // Reference to the chat box div for scrolling
            >
                {/* Display messages */}
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div>
                {/* Input field and submit button */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={message}
                        onChange={handleMessageChange}
                        placeholder="Type your message..."
                        style={{ width: "calc(50% - 70px)", marginRight: "10px" }}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </>
    );
}

