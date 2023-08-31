const db = require('../db/db');

class Controller {
    async createOrder(req, res) {
        try{
            const {product_name, quantity, name, telephone, address} = req.body
            
            const product = await db('products').where('name', product_name).first();
    
            if (!product) {
                return res.status(404).json({ message: 'Produk tidak ditemukan' });
            }
    
            const total_amount = product.price * quantity;
            
            await db('orders').insert({
                product_id: product.id,
                product_name: product.name,
                quantity: quantity,
                total_amount: total_amount,
                name: name,
                telephone: telephone,
                address: address
            })
    
            res.status(201).json({ status: 201, message: 'Data order berhasil ditambahkan!' });
        } catch (error) {
            res.json({
                status : 500,
                message: error.message
            });
        }
    }

    async order(req, res) {
        res.render('order.ejs')
    }
    
    // async getOrderByCustomer(req, res) {
    //     const id = req.query.id;
    //     const order = await db.query('SELECT * FROM orders WHERE customer_id = $1', [id]);
    //     res.json(order.rows[0]);
    // } 

    // async updateOrder(req, res) {
    //     const id = req.params.id;
    //     const { customer_id, basket_id, date, shipper_id, fulfilled, total_price, payment_id } = req.body;
    //     const order = await db.query('UPDATE orders SET customer_id = $1, basket_id = $2, date = $3, shipper_id = $4, fulfilled = $5, total_price = $6, payment_id = $7 WHERE id = $8 RETURNING *', [customer_id, basket_id, date, shipper_id, fulfilled, total_price, payment_id, id]);
    //     res.json(order.rows[0]);
    // }
    // async deleteOrder(req, res) {
    //     const id = req.params.id;
    //     const order = await db.query('DELETE FROM orders WHERE id = $1', [id]);
    //     res.json(order.rows[0]);
    // }

};

module.exports = new Controller();
