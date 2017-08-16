
export function addItem(newItem){
    console.log("Adding an Item");
    return {
        type:'ADD_ITEM',
        newItem
    }
}

export function completeItem(id){
    console.log("Sending Complete_Item");
    return {
        type:'COMPLETE_ITEM',
        id
    }
}

export function deleteItem(id){
    console.log("Sending Delete_Item");
    return {
        type:'DELETE_ITEM',
        id
    }
}
