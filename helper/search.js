module.exports = (query) => {
    let ObSeacrh = {
        keyword: "",
        regex: "",
    }

    if (query.keyword) {
        ObSeacrh.keyword = query.keyword;
        ObSeacrh.regex = { $regex: query.keyword, $options: "i" };
    }
    return ObSeacrh
}