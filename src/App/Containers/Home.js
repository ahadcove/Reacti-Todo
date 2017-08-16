import React,{Component} from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {addList, deleteList} from '../../Services/Actions/TodoListActions'
import HomeList from '../Components/HomeList';
import '../Styles/s_home.css';
import Loader from '../Utilities/Loader';

class Home extends Component{
    constructor(){
        super();
        this.state={
            new_list_name:"",
            new_list_background:"",
            new_list_color:"",
            error: false,
            errorMsg:'',
            loading:true
        }        
    }

    componentDidMount(){
        // if(!this.props.auth.username || !this.props.auth.twitchOAuth || !this.props.auth.hue.ip || !this.props.auth.hue.user)
       console.log("Home Mounted");       
    }
    componentWillUnmount(){
        console.log("Home is unmounting");
    }

    // Check to see if list matches users id
    isUser = (list) => {
        if(list.userId == this.props.auth.id && !list.isDeleted){
            return true;
        } else
            return false;
    }

    getTodos = () =>{
            let myLists = this.props.todo_list.lists.filter(this.isUser);
            console.log("My Lists", myLists);
            return myLists;
    }

    gotoTodo = (list) => {
        console.log("Navigating to list", list);
        this.props.history.push("/todo-list", {listId:list.id, listName:list.name});
    }

    addTodoList = () => {
        if(this.state.new_list_name){
            let newList = {
                id: this.props.todo_list.lists.length,
                userId: this.props.auth.id,
                name: this.state.new_list_name,
                background: this.state.new_list_background,
                color: this.state.new_list_color,
                isDeleted: false
            };
            this.props.addList(newList);
            this.setState({new_list_name:'', new_list_background:'', new_list_color:'', error:false, errorMsg:""});
            this.nameInput.blur();
        } else{
            this.setState({error:true, errorMsg:"List needs a name"});
        }
    }

    deleteAttempt = (id) => {
        console.log("Deleting list", id);
        // let index = this.myIndexOf(id);
        // console.log("Index", index);
        // if(index>=0){
        this.props.deleteList(id);
        // }
    }

  _handleInputChange = (e) =>{
        const value = e.target.value;
        const name = e.target.name;
        console.log("Name", name);
        this.setState({
        [name]: value
        });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            switch(e.target.name){
                case "new_list_name":
                    // this.descriptionInput.focus();
                    this.addTodoList();
                break;
                default:
                break;
            }
        }
    }

    render(){
        return(
            <div className={"home_contain"}>
                <div>
                    <div className={"add_list_contain"}>
                        <div className={"add_title"}>Add Todo</div>
                         {/* <label>Title</label> */}
                         {this.state.error && <div className={"error"}>{this.state.errorMsg}</div>}
                         <div className={"add_box"}>
                            <input className={"title_input"} name="new_list_name" ref={(input) => { this.nameInput = input; }} type="text" maxLength="45" value={this.state.new_list_name} onChange={this._handleInputChange} placeholder={"Name"} onKeyPress={this._handleKeyPress} />   
                         </div>
                         <button onClick={this.addTodoList}>Done</button>
                    </div>
                    <div className={"list_contain"}>
                            {/* {this.state.loading && <Loader />} */}
                            {this.getTodos().map(list=>{
                                {/* return <li className={"list"} key={list.id} onClick={()=>this.gotoTodo(list)}>{list.name}</li> */}
                                return <HomeList key={list.id} gotoTodo={()=>this.gotoTodo(list)} list={list} deleteList={this.deleteAttempt} />
                            })}
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
        addList:(newList) => {
            dispatch(addList(newList))
        },
        deleteList:(listId) => {
            dispatch(deleteList(listId))
        },
    }
};

export default withRouter(connect(mapState, mapDispatch)(Home))

