import React from "react"
import {Login} from "./Login"
import {GameState} from "./game"


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
            token: ""
        };
    }

    handleLoginSuccess = (token) => {
        this.setState({
            token: token,
            loginSuc: true,
            
        });
    }; 
    
    

    render(){
        return(
            <>
                <h1>Title of the is {this.state.game}</h1>
                {!this.state.loginSuc && <Login onLoginSuccess={this.handleLoginSuccess} />}
                {this.state.loginSuc && <GameState token={this.state.token} />}
            </>
        );
    }
}

