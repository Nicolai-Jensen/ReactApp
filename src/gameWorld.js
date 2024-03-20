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
    /*handleDisError =() =>{
        this.setState({
            token:null,
            loginSuc: false
        });
    }*/
    
    

    render(){
        return(
            <>
                {!this.state.loginSuc && <Login onLoginSuccess={this.handleLoginSuccess} />}
                {this.state.loginSuc && <GameState token={this.state.token}/>}
            </>
        );
    }
}

