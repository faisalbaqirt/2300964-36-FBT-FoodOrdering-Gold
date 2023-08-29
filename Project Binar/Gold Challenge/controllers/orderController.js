const db = require('../db/db');

class Controller {
    async createOrder(req, res) {
        const { customer_id, basket_id, date, shipper_id, fulfilled, total_price, payment_id } = req.body;
        const newOrder = await db.query('INSERT INTO orders (customer_id, basket_id, date, shipper_id, fulfilled, total_price, payment_id) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [customer_id, basket_id, date, shipper_id, fulfilled, total_price, payment_id])
        res.json(newOrder.rows[0]);
    }

    async getOrderByCustomer(req, res) {
        const id = req.query.id;
        const order = await db.query('SELECT * FROM orders WHERE customer_id = $1', [id]);
        res.json(order.rows[0]);
    } //http://localhost:8080/order?id=1

    // async getOneOrder(req, res) {
    //     const id = req.params.id;
    //     const order = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
    //     res.json(order.rows[0]);
    // }
    async updateOrder(req, res) {
        const id = req.params.id;
        const { customer_id, basket_id, date, shipper_id, fulfilled, total_price, payment_id } = req.body;
        const order = await db.query('UPDATE orders SET customer_id = $1, basket_id = $2, date = $3, shipper_id = $4, fulfilled = $5, total_price = $6, payment_id = $7 WHERE id = $8 RETURNING *', [customer_id, basket_id, date, shipper_id, fulfilled, total_price, payment_id, id]);
        res.json(order.rows[0]);
    }
    async deleteOrder(req, res) {
        const id = req.params.id;
        const order = await db.query('DELETE FROM orders WHERE id = $1', [id]);
        res.json(order.rows[0]);
    }

};

module.exports = new Controller();
