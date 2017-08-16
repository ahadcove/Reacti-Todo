
export function addList(newList){
    console.log("Adding a List");
    return {
        type:'ADD_LIST',
        newList
    }
}

export function deleteList(id){
    console.log("Sending Delete_List");
    return {
        type:'DELETE_LIST',
        id
    }
}
