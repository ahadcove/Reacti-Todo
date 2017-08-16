const TodoItemsReducer = (state={
    items:[
        {
            id:null,
            listId:null,
            title: null,
            description: null,
            color: null,
            completed: false,
            isDeleted: false
        },
        // {
        //     id:7,
        //     listId:4,
        //     title: "Red Beds are best",
        //     description: "Definitely right",
        //     color: "red",
        //     completed: false,            
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
        case 'ADD_ITEM':
        state={
            ...state,
            items: [...state.items, action.newItem]
        }
        break;
        case 'COMPLETE_ITEM':
        state={
            ...state,
            items: state.items.map(item => item.id === action.id ?
            { ...item, completed: !item.completed } : 
            item
            )  
        }
        break;
        case 'DELETE_ITEM':
        state={
            ...state,
            items: state.items.map(item => item.id === action.id ?
            { ...item, isDeleted: !item.isDeleted } : 
            item
            )  
        }
        break;

        default:
            break;
    }
    return state;
};

export default TodoItemsReducer;