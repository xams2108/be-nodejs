const Cart = require("../../model/cart.model")
const Product = require("../../model/products.model")
const { updateOne } = require("../../model/products.model")
module.exports.index = async (req, res) => {
    const cartID = req.cookies.cart;
    const cart = await Cart.findOne({ _id: cartID }).lean();
    const result = {
        _id: cart._id,
        subtotal: 0,
        products: []
    };
    for (const item of cart.products) {
        const product = await Product.findOne({
            _id: item.productID,
            deleted: false,
            status: "active"
        }).lean();

        if (product) {
            const productItem = {
                product: product,
                quantity: item.quantity,
                total: item.quantity * product.price
            };

            result.products.push(productItem);
            result.subtotal += productItem.total;
        }
    }

    console.log(result);
    res.render("client/pages/cart/index", {
        cart: result

    })

}
module.exports.addToCart = async (req, res) => {
    const cart = req.cookies.cart
    console.log(req.body)
    const productID = req.body.productId
    const quantity = req.body.quantity
    const productexits = await Cart.findOne({ _id: cart, "products.productID": productID })
    if (productexits) {
        await Cart.updateOne({ _id: cart, "products.productID": productID }, { $inc: { "products.$.quantity": parseInt(quantity) } })
    } else {
        await Cart.updateOne({ _id: cart }, { $push: { products: { productID: productID, quantity: parseInt(quantity) } } })
    }
    res.redirect("back")
}

module.exports.deleteProduct = async (req, res) => {
    cartID = req.cookies.cart
    productID = req.params.productID
    await Cart.updateOne(
        { _id: cartID },
        { $pull: { products: { productID: productID } } }
    )
    res.redirect("back")
}
module.exports.update = async (req, res) => {
    const cartID = req.cookies.cart
    const productID = req.params.productId
    const value = req.params.value
    await Cart.updateOne(
        { _id: cartID, "products.productID": productID },
        {
            $set: { "products.$.quantity": parseInt(value) }
        }
    )

    res.redirect("back")
}
module.exports.checkout = async (req, res) => {
    const cartID = req.cookies.cart
    const cart = await Cart.findOne({ _id: cartID }).lean();
    const result = {
        _id: cart._id,
        subtotal: 0,
        products: []
    };
    for (const item of cart.products) {
        const product = await Product.findOne({
            _id: item.productID,
            deleted: false,
            status: "active"
        }).lean();

        if (product) {
            const productItem = {
                product: product,
                quantity: item.quantity,
                total: item.quantity * product.price
            };

            result.products.push(productItem);
            result.subtotal += productItem.total;
        }
    }

    console.log(result);
    res.render("client/pages/cart/checkout", {
        cart: result

    })
}