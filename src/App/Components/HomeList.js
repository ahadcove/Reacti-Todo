import React from "react";
import '../Styles/s_home_list.css';

const HomeList = (props) => {
    const { deleteList, gotoTodo} = props
    const { id, name, background, color} = props.list

    let listStyle = () => {
        let style = {}

        return style;
    }

    return (
        <div className={"list"} >
            <span className={"home_close_icon"} onClick={()=>deleteList(id)}>x</span>
            <div className={"back_list"} onClick={()=>gotoTodo(props.list)}  />
            <div className={"list_name"} onClick={()=>gotoTodo(props.list)}>
                {name}
            </div>
        </div>
    )
}

export default HomeList;