const userListReducer = (state={
    id:null,
    username: null,
    avatar: null,
    saveLogin: null,
    signedIn: false
}, action) => {
    switch(action.type){
        case 'FRESH':
        state={
            ...state,       
        }
        break;
        case 'SIGN_IN':
        state={
            ...state,
            id: action.cred.id,
            username: action.cred.username,
            avatar: action.cred.avatar,
            saveLogin: action.cred.saveLogin,
            signedIn: true    
        }
        break;
        case 'SIGN_UP':
        state={
            ...state,
            id: action.cred.id,
            username: action.cred.username,
            avatar: action.cred.avatar,
            saveLogin: action.cred.saveLogin,
            signedIn: true    
        }
        break;
        case 'SIGN_OUT':
        state={
            ...state,
            id:null,
            username: null,
            avatar: null,
            saveLogin: null,
            signedIn: true  
        }
        break;

        default:
            break;
    }
    return state;
};

export default userListReducer;