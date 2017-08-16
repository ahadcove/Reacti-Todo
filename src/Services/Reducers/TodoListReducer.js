const TodoListReducer = (state={
    lists:[
        {
            id:1,
            userId:1,
            name: 'Wowwee',
            background: "blue",
            color: "black",
            isDeleted: false
        },
        {
            id:2,
            userId:1,
            name: 'Sumbone',
            background: "blue",
            color: "black",
            isDeleted: false
        },
        {
            id:3,
            userId:2,
            name: 'Rappi',
            background: "blue",
            color: "black",
            isDeleted: false
        },
        {
            id:3,
            userId:4,
            name: 'Tap',
            background: "blue",
            color: "black",
            isDeleted: false
        },
        {
            id:4,
            userId:1,
            name: 'Colly',
            background: "blue",
            color: "black",
            isDeleted: false
        },
    ],
    size:1
}, action) => {
    switch(action.type){
        case 'FRESH': // Remove all Lists
        state={
            ...state,         
        }
        break;
        case 'ADD_LIST':
        state={
            ...state,
            lists: [...state.lists, action.newList]
        }
        break;
        case 'DELETE_LIST':
        state={
            ...state,
            lists: state.lists.map(list => list.id === action.id ?
            { ...list, isDeleted: !list.isDeleted } : 
            list
            )  
        }
        break;

        default:
            break;
    }
    return state;
};

export default TodoListReducer;