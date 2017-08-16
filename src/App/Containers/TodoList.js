import React,{Component} from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import TodoItem from '../Components/TodoItem';
import {addItem, completeItem, deleteItem} from '../../Services/Actions/TodoItemActions'
import "../Styles/s_todo_list.css";

class TodoList extends Component{
    constructor(){
        super();
        this.state={
            listId:null,
            listName: null,
            background: "blue",
            color: "black",
            isDeleted: false,
            new_todo_title:"",
            new_todo_description:"",
            new_todo_color:null,
        }        
    }

    componentDidMount(){
        // if(!this.props.auth.username || !this.props.auth.twitchOAuth || !this.props.auth.hue.ip || !this.props.auth.hue.user)
       console.log("TodoList Mounted");
       console.log("Location",this.props.location);
       this.setState({listId:this.props.location.state.listId, listName:this.props.location.state.listName});

    }
    componentWillUnmount(){
        console.log("TodoList is unmounting");
    }

    // Check to see if items match list id
    isList = (item) => {
        // if(item.listId == this.state.id ){
            // TODO: Retrieve id from props
        if(item.listId == this.state.listId && !item.isDeleted){
            return true;
        } else
            return false;
    }

    getItems = () =>{
        let listItems = this.props.todo_items.items.filter(this.isList);
        return listItems;
    }

    addTodo = () => {
        if(this.state.new_todo_title){
            let newItem = {
                id: this.props.todo_items.items.length,
                listId: this.state.listId,
                title: this.state.new_todo_title,
                description: this.state.new_todo_description,
                color: this.state.new_todo_color,
                completed: false,
                isDeleted: false
            };
            this.props.addItem(newItem);
            this.setState({new_todo_title:'', new_todo_description:'', color:null, error:false, errorMsg:""});
            this.descriptionInput.blur();
        } else{
            this.setState({error:true, errorMsg:"Todo needs atleast a title"});
            this.titleInput.focus();            
        }
    }

    completeItem = (id) => {
        console.log("Completing item", id);
        this.props.completeItem(id);
    }

    // Find index of item
    // myIndexOf = (id) => {    
    //     for (let i = 0; i < this.props.todo_items.items.length; i++) {
    //         if (this.props.todo_items.items[i].id == id) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    deleteAttempt = (id) => {
        console.log("Deleting item", id);
        // let index = this.myIndexOf(id);
        // console.log("Index", index);
        // if(index>=0){
        this.props.deleteItem(id);
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
                case "new_todo_title":
                    this.descriptionInput.focus();
                break;
                case "new_todo_description":
                    this.addTodo();
                break;
                default:
                break;
            }
        }
    }

    render(){
        return(
            <div className={"todo_contain"}>
                    <div className={"list_item_name"}>
                        <span>{this.state.listName}</span> List
                    </div>
                    <div className={"add_item_contain"}>
                        <div className={"add_title"}>Add Todo Folder</div>
                         {/* <label>Title</label> */}
                         {this.state.error && <div className={"error"}>{this.state.errorMsg}</div>}
                         <div className={"add_item_box"}>
                            <input className={"new_todo_title"} name="new_todo_title" ref={(input) => { this.titleInput = input; }} type="text" maxLength="45" value={this.state.new_todo_title} onChange={this._handleInputChange} placeholder={"Title"} onKeyPress={this._handleKeyPress} />   
                            <input className={"new_todo_description"} name="new_todo_description" ref={(input) => { this.descriptionInput = input; }}  type="text" maxLength="155" value={this.state.new_todo_description} onChange={this._handleInputChange} placeholder={"Description"} onKeyPress={this._handleKeyPress} />   
                         </div>
                         <button onClick={this.addTodo}>Done</button>
                    </div>
                    <div className={"list_item_contain"}>
                        <ul>
                            {this.getItems().map((item)=>{
                                return <TodoItem key={item.id} item={item} completeItem={this.completeItem}  deleteItem={this.deleteAttempt} />
                            })}
                        </ul>
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
        addItem:(newItem) => {
            dispatch(addItem(newItem))
        },
        completeItem:(id) => {
            dispatch(completeItem(id))
        },
        deleteItem:(id) => {
            dispatch(deleteItem(id))
        }
    }
};

export default withRouter(connect(mapState, mapDispatch)(TodoList))

