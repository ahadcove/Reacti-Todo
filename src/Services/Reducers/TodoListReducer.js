const TodoListReducer = (state={
    lists:[
        {
            id:null,
            userId:null,
            name: null,
            background: null,
            color: null,
            isDeleted: false
        },
        // {
        //     id:4,
        //     userId:1,
        //     name: 'Colly',
        //     background: "blue",
        //     color: "black",
        //     isDeleted: false
        // },
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