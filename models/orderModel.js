const db = require('../db/db');

class OrderModel {
    async insertOrder(orderData) {
        try {
            const [order_id] = await db('orders').insert(orderData).returning('id');
            return order_id;
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
}

module.exports = new OrderModel();
