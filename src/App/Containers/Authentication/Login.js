import React,{Component} from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {signIn} from '../../../Services/Actions/AuthActions';
import '../../Styles/s_auth.css';
import Loader from '../../Utilities/Loader';

class Login extends Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            saveLogin:true,
            error:false,
            errorMsg:false,
            loading:false
        }
    }

    componentDidMount(){}

    componentDidUpdate(){
        if(this.props.auth.username && this.props.auth.signedIn){
            this.props.history.push("/");
        }
    }

    checkForUser = () => {
        return new Promise((resolve, reject)=>{
            setTimeout(_=>{
                for (let i = 0; i < this.props.user_list.users.length; i++) {
                    if(this.props.user_list.users[i].username === this.state.username && this.props.user_list.users[i].password === this.state.password) {
                        resolve({id:this.props.user_list.users[i].id, avatar:this.props.user_list.users[i].avatar});
                    } else if(i == this.props.user_list.users.length-1){
                        reject("User not found");
                    }
                }
            },1500);
        })
    }

    loginAttempt = () =>{
        if(this.state.username && this.state.password){
            this.setState({loading:true});
            console.log("Attempting Login");  
            this.checkForUser()
            .then(res=>{
                console.log("Success",res);
                this.setState({loading:false, error:false, errorMsg:""});
                this.props.signIn({id:res.id, username:this.state.username, avatar:res.avatar, saveLogin:this.state.saveLogin});
            }).catch(err=>{
                console.log("Failed",err);
                this.setState({loading:false, password:'', error:true, errorMsg:"Username and / or password is incorrect"});
                this.passwordInput.focus();
            })
        } else{
            this.setState({password:'', error:true, errorMsg:"Please enter both your username and password"});
            this.usernameInput.focus();
        }
    }            

    saveLogin = () =>{
        let newSave = !this.state.saveLogin
        this.setState({saveLogin:newSave})
    }
    
    _handleInputChange = (e) =>{
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
        [name]: value
        });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            switch(e.target.name){
                case "username":
                this.passwordInput.focus();
                break;
                case "password":
                this.loginAttempt();
                break;
                default:
                break;
            }
        }
    }

    render(){
        return(
            <div className="login_contain">
                {this.state.error && <div className="error">{this.state.errorMsg}</div>}
                {this.state.loading ?
                <div>
                    <Loader />
                    {/* Logging In */}
                </div>
                :
                <div className="auth_box">
                        <label>Username</label>
                            <input className={"input"} name="username" autoFocus ref={(input) => { this.usernameInput = input; }} type="text" maxLength="45" value={this.state.username} onChange={this._handleInputChange} onKeyPress={this._handleKeyPress} placeholder={"username"} />
                        <label>Password</label>
                        <input className={"input"}  name="password" ref={(input) => { this.passwordInput = input; }} type="password" maxLength="25" value={this.state.password} onChange={this._handleInputChange} onKeyPress={this._handleKeyPress} placeholder={"password"} />
                            {/* <div className="save_box">
                                <label>Save Login </label>
                                <button className="save_button" onClick={this.saveLogin} style={{backgroundColor: (this.state.saveLogin ? "blue" : 'white')}}  />
                            </div> */}
                        <button className={"submit_button"} type="submit" onClick={this.loginAttempt}>Login</button>
                </div>
                }
            </div>
        )
    }
}


const mapState = (state = {}) => {
    return {...state};
};

const mapDispatch = (dispatch) => {
    return {
        signIn:(cred) => {
            dispatch(signIn(cred))
        },
    }
};

export default withRouter(connect(mapState, mapDispatch)(Login))