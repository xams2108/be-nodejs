module.exports = async (query, find, numIteminPage, model) => {
    const items = require(`../model/${model}.model`)
    const ObjectPagination = {
        currentPage: 1,
        limitItem: numIteminPage,

    }
    if (query.page) {
        ObjectPagination.currentPage = parseInt(query.page);

    }
    const countProduct = await items.countDocuments(find)
    ObjectPagination.pages = (Math.ceil(countProduct / ObjectPagination.limitItem))
    return ObjectPagination;
}