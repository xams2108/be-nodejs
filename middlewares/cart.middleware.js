const Cart = require("../model/cart.model");

module.exports.check = async (req, res, next) => {
    try {
        let cartId = req.cookies.cart;
        let needSetCookie = false;

        // Kiểm tra cartId có hợp lệ không
        if (!cartId || !(await Cart.exists({ _id: cartId }))) {
            const newCart = new Cart();
            await newCart.save();
            cartId = newCart._id;
            needSetCookie = true;
        }

        // Chỉ set cookie khi cần thiết
        if (needSetCookie) {
            res.cookie('cart', cartId, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
                httpOnly: true
            });
        }

        // Lấy thông tin giỏ hàng
        res.locals.cart = await Cart.findById(cartId);
        next();
    } catch (error) {
        next(error);
    }
};