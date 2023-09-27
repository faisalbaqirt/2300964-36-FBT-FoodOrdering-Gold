const OrderModel = require('../models/orderModel');
const db = require('../db/db')

class Controller {
    async createOrder(req, res) {
        try {
            const { product_name, quantity, name, telephone, address } = req.body;

            const product = await db('products').where('name', product_name).first();
            if (!product) {
                return res.status(404).json({ message: 'Produk tidak ditemukan' });
            }
            const total_amount = product.price * quantity;

            const order_id = await OrderModel.insertOrder({
                product_id: product.id,
                product_name: product.name,
                quantity: quantity,
                total_amount: total_amount,
                name: name,
                telephone: telephone,
                address: address
            });

            res.status(201).json({ status: 201, order_id: order_id, message: 'Data order berhasil ditambahkan!' });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }

    order(req, res) {
        res.render('order.ejs')
    }
    

};

module.exports = new Controller();
