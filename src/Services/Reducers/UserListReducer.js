const userListReducer = (state={
    users:[
        {
            id:0,
            username: "cove",
            password: "abc",
            avatar: null
        }
    ]
}, action) => {
    switch(action.type){
        case 'SIGN_UP':
        state={
            ...state,
            users: [...state.users, action.cred]
        }
        break;

        default:
            break;
    }
    return state;
};

export default userListReducer;