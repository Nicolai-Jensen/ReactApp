import React from "react"
import {Login} from "./Login"
import { DrawingChatBox } from "./ChatBoxs";
import useGameServer from "./useGameServer";

export function App(props){
    return(
        <>
            <DrawGameWorld/>
        </>
    );
}
class DrawGameWorld extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            game: "John Cena",
            loginSuc: false,
            token: "",
            gameServerObj: null
        };
    }

    handleLoginSuccess = (token) => {
        this.setState({
            loginSuc: true,
            token: token,
        });
    }; 

    handleConnectionClosed = () => {
        // Handle connection closed
    };
    
    componentDidMount() {
        // Using the useGameServer hook here
        if (this.state.loginSuc && this.state.token) {
            const gameServer = useGameServer("http://react.tsanas.com/gamehub", this.state.token, this.handleConnectionClosed);

            // Store the gameServer object in state
            this.setState({ gameServerObj: gameServer }); 
        }
        console.log(this.state.gameServerObj);
    }
    
    handleChat(props){
        this.state.gameServerObj.onEvent()=> {
            console.log("Something happend")
        }
    }

    render(){
        return(
            <>
                <h1>Title of the is {this.state.game}</h1>
                {!this.state.loginSuc && <Login onLoginSuccess={this.handleLoginSuccess} />}
                {this.state.loginSuc && <DrawingChatBox props/>}
            </>
        );
    }
}

