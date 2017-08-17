import React,{Component} from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {signUp} from '../../../Services/Actions/AuthActions';
import '../../Styles/s_auth.css';
import Loader from '../../Utilities/Loader';

class SignUp extends Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            confirmPassword:'',
            avatar:'',
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


    // Check to make sure username has not been used
    checkForUser = () => {
        return new Promise((resolve, reject)=>{
            setTimeout(_=>{                
                for (let i = 0; i < this.props.user_list.users.length; i++) {
                    if(this.props.user_list.users[i].username === this.state.username) {
                        reject("User found");
                    } else if(i == this.props.user_list.users.length-1){
                        resolve(this.props.user_list.users.length);
                    }
                }
            },1500);        
        })
    }

    // Login Attempt
    loginAttempt = () =>{
        if(this.state.username && this.state.password){
            this.setState({loading:true});            
            if(this.state.password === this.state.confirmPassword){
                console.log("Attempting SignUp");  
                this.checkForUser()
                .then(res=>{
                    console.log("Success",res);
                    this.setState({loading:false, error:false, errorMsg:""});
                    this.props.signUp({id:res, username:this.state.username, password:this.state.password, avatar:this.state.avatar, saveLogin:this.state.saveLogin});
                }).catch(err=>{
                    console.log("Failed",err);
                    this.setState({loading:false, password:'', error:true, errorMsg:"User already exists, Please login"});
                    this.passwordInput.focus();
                })
            } else{
                this.setState({ loading:false, error:true, errorMsg:"Make sure both password and confirmation are the same"});
                this.passwordInput.focus();
            }
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
        console.log(e.target.name);
        if (e.key === 'Enter') {
            switch(e.target.name){
                case "username":
                this.passwordInput.focus();
                break;
                case "password":
                this.confirmInput.focus();
                break;
                case "confirmPassword":
                this.loginAttempt();
                break;
                case "avatar":
                this.loginAttempt();
                break;
                default:
                break;
            }
        }
    }

    render(){
        return(
            <div className="signup_contain">
                {this.state.error && <div className="error">{this.state.errorMsg}</div>}
                {this.state.loading ?
                <div>
                    <Loader />
                    {/* Logging In */}
                </div>
                :
                <div className="auth_box">
                            <label>Username</label>
                                <input className="input" name="username" ref={(input) => { this.usernameInput = input; }} type="text" maxLength="45" value={this.state.username} onChange={this._handleInputChange} onKeyPress={this._handleKeyPress} placeholder={"username"} />
                            <label>Password</label>
                                <input className="input" name="password" type="password" ref={(input) => { this.passwordInput = input; }} maxLength="25" value={this.state.password} onChange={this._handleInputChange} onKeyPress={this._handleKeyPress} placeholder={"password"} />
                             <label>Confirm Password</label>
                                <input className="input" name="confirmPassword" ref={(input) => { this.confirmInput = input; }} type="password" maxLength="25" value={this.state.confirmpassword} onChange={this._handleInputChange} onKeyPress={this._handleKeyPress} placeholder={"confirm"} />
                             <label>Avatar</label>
                                {this.state.avatar && <img className="avatar" src={this.state.avatar} alt={"Avatar"} />}
                                <input className="input" name="avatar" type="text" ref={(input) => { this.avatarInput = input; }} value={this.state.avatar} onChange={this._handleInputChange} onKeyPress={this._handleKeyPress} placeholder={"avatar url"} />
                            {/* <div className="save_box">
                                <label>Save Login </label>
                                <button className="save_button" onClick={this.saveLogin} style={{backgroundColor: (this.state.saveLogin ? "blue" : 'white')}} />
                            </div> */}
                        <button className="signup_button" type="submit" onClick={this.loginAttempt} >Sign Up</button>
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
        signUp:(cred) => {
            dispatch(signUp(cred))
        },
    }
};

export default withRouter(connect(mapState, mapDispatch)(SignUp))