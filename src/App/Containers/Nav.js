import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {signOut} from '../../Services/Actions/AuthActions';
import FaUser from "react-icons/lib/fa/user";

import '../Styles/s_nav.css';

class Nav extends Component{
    constructor(){
        super();
        this.state={
            shouldRedirect:false,
            avatarOpen: false
        }
    }

    componentDidMount(){
        if(!this.props.auth.username || !this.props.auth.signedIn){
            this.setState({shouldRedirect:true})
        } else{
            this.setState({shouldRedirect:false})
        }
    }

    componentDidUpdate(){
        // if(!this.props.auth.username || !this.props.auth.id || !this.props.auth.signedIn){
        //     this.setState({shouldRedirect:true})
        // } else{
        //     this.setState({shouldRedirect:false})
        // }
    }

    switchProfile = () => {
        this.setState({avatarOpen:!this.state.avatarOpen});
    }

    logout = () => {
        this.props.signOut();
        this.setState({shouldRedirect:true});
    }


    render(){
        return(
            this.state.shouldRedirect ?
            <Redirect to={'/auth'} />
            :
            <div className={"nav_contain"}>
                <Link to='/'>Home</Link>
                <div className={"title"}>Reacti Todo</div>
                <div className={"profile_contain"}>
                    <div className={"avatar_box"} onClick={this.switchProfile}>
                        <div className={"avatar_and_name"}>
                            {this.props.auth.avatar ? <img src={this.props.auth.avatar} className={"avatar_image"} alt={"Avatar"} /> : <FaUser className={"avatar"} />}
                            <div className={"username"}>{this.props.auth.username}</div>
                        </div>
                        {this.state.avatarOpen &&
                            <div className={"options"}>
                                <div className={"option_item"} onClick={this.logout}>Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state = {}) => {
    return {...state};
};

const mapDispatch = (dispatch) => {
    return {
        signOut:() => {
            dispatch(signOut())
        }, 
    }
};

export default withRouter(connect(mapState, mapDispatch)(Nav))