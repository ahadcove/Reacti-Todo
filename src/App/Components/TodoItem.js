import React from "react";
import '../Styles/s_todo_item.css';

const TodoItem = (props) => {
    const { completeItem, deleteItem} = props
    const { id, listId, title, description, color, completed, isDeleted} = props.item

    let itemStyle = () => {
        let style = {
            textDecoration:'none',
        }
        if(completed){
            style.textDecoration='line-through';
        }

        return style;
    }

    return (
        <li className={"item_contain"} style={{color}}>
            <span className={"close_icon"} onClick={()=>deleteItem(id)}>x</span>
            <div className={"top"}>
                <div className={"check_box"} onClick={()=>completeItem(id)}>
                    {completed && <div className={"check_mark"} style={{borderColor:(completed && (color && color))}} />}
                </div>
                <span className={"item_title"} style={itemStyle()} onClick={()=>completeItem(id)}>{title}</span>
            </div>
            {/* <div className={"item_head"} style={itemStyle()}>
            </div> */}
            {!completed && <div className={"item_description"} style={{}} onClick={()=>completeItem(id)}>{description}</div>}
        </li>
    )
}

export default TodoItem;