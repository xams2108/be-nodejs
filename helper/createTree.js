const createtree = (arr, parentid = "") => {
    const tree = []
    arr.forEach(item => {
        if (item.parent_id === parentid) {
            const newItem = item
            const children = createtree(arr, item._id)
            if (children) {
                newItem.children = children
            }
            tree.push(newItem)
        }

    });
    return tree
}


module.exports.TreeHelper = (arr, parentid = "") => {
    const tree = createtree(arr)
    return tree
}
