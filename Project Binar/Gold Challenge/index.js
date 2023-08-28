const express = require('express');
const app = express();
const db = require('./db/db');

app.get('/api/products', async (req, res) => {
    try {
        // Select operation
        const data = await db.select('*').from('products');

        res.json({
            status: 200,
            data: data
        })
    } catch (error) {
        res.json({
            status : 500,
            message: error.message
        });
    }
})

const PORT = 3000;
app.listen(PORT, (req, res)=> {
    console.log(`Listening on port ${PORT}`)
})