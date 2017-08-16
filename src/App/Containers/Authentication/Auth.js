import React,{Component} from 'react';
import Login from './Login'
import Signup from './Signup'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import '../../Styles/s_auth.css';

class Auth extends Component{
    constructor(){
        super();
        this.state={
            login:true
        }
    }

    componentDidMount(){

        if(!this.props.auth.saveLogin){
            // this.props.freshLogin();
        }

        else if(this.props.auth.username && this.props.auth.signedIn){
            console.log("Signed In");
            // this.props.history.push("/home");
        }
    }

    componentDidUpdate(){
        if(this.props.auth.username && this.props.auth.signedIn && this.props.auth.userid){
            console.log("Signed In");
            if(this.props.auth.saveLogin){
                // this.props.saveReduxState();
            }
            // this.props.history.push("/home");
        }
    }

    switchAccount = (e) =>{ this.setState({login:!this.state.login}) }

    render(){
        console.log("Location", window.location.href);
        return(
           <div className={"auth_contain"}>
            <div className={"title"}>Reacti Todo</div>
                <div className={"switch_row"}>
                    <button className={"switch_button"} style={{backgroundColor:(this.state.login && 'darkslategray')}} name={"login"} onClick={this.switchAccount}>Login</button>
                    <button className={"switch_button"} style={{backgroundColor:(!this.state.login && 'darkslategray')}} name={"signup"} onClick={this.switchAccount}>Signup</button>
                </div> 
            {this.state.login ?
                    <Login />
                    :
                    <Signup/> 
            }   
           </div>
        )
    }
}
// 
const mapState = (state = {}) => {
    return {...state};
};

const mapDispatch = (dispatch) => {
    return {
        // freshLogin:() => {
        //     dispatch(freshLogin())
        // },
        // saveReduxState:() => {
        //     dispatch(saveReduxState())
        // },
        // resetAllSettings:() => {
        //     dispatch(resetAllSettings())
        // }
    }
};

export default withRouter(connect(mapState, mapDispatch)(Auth))