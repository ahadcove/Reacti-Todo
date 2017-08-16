import {combineReducers} from "redux";

import auth from './AuthReducer';
import user_list from './UserListReducer';
import todo_list from './TodoListReducer';
import todo_items from './TodoItemsReducer';

const appReducer = combineReducers({
    auth, user_list, todo_list, todo_items
});

const rootReducer = (state, action) => {
    if(action.type === 'ERASE_DATA') {
        console.log("Erasing all data");
        state = undefined;
    }
    return appReducer(state,action);
}

export default rootReducer;