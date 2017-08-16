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
        {
            id:1,
            listId:1,
            title: "Buy Headphones",
            description: null,
            color: "yellow",
            completed: false,            
            isDeleted: false
        },
        {
            id:2,
            listId:1,
            title: "Cut toe nails",
            description: "Make sure them babies are chopped",
            color: "orange",
            completed: true,            
            isDeleted: false
        },
        {
            id:3,
            listId:2,
            title: "Eat alot of honey",
            description: null,
            color: "blue",
            completed: false,            
            isDeleted: false
        },
        {
            id:4,
            listId:3,
            title: "Turn on fan",
            description: "Make sure the fan is on",
            color: "reg",
            completed: false,            
            isDeleted: false
        },
        {
            id:5,
            listId:1,
            title: "Goto the store",
            description: "Pick up some eggs",
            color: "black",
            completed: false,            
            isDeleted: false
        },
        {
            id:6,
            listId:1,
            title: "Goto bed at 8.am",
            description: "Immediately",
            color: "red",
            completed: true,            
            isDeleted: true
        },
        {
            id:7,
            listId:4,
            title: "Red Beds are best",
            description: "Definitely right",
            color: "red",
            completed: false,            
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