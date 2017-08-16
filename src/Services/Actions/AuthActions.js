
// export function attemptSignIn(cred){
   
// }

export function signIn(cred){
    return {
        type:'SIGN_IN',
        cred
    }
}

export function signUp(cred){
    return {
        type:'SIGN_UP',
        cred
    }
}

export function signOut(){
    return {
        type:'SIGN_OUT'
    }
}
 