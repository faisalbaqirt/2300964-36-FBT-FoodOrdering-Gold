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
            
            const [order_id] = await db('orders').insert({
                product_id: product.id,
                product_name: product.name,
                quantity: quantity,
                total_amount: total_amount,
                name: name,
                telephone: telephone,
                address: address
            }).returning('id'); // Mengembalikan ID pesanan yang baru saja dibuat


            
            res.status(201).json({ status: 201, order_id: order_id, message: 'Data order berhasil ditambahkan!' });
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
    

};

module.exports = new Controller();
