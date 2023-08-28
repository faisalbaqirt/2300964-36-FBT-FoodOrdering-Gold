const express = require('express');
const app = express();
const db = require('./db/db');

app.use(express.json())

// membaca semua data produk yang ada di database
app.get('/api/products', async (req, res) => {
    try {
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

// membaca data produk yang ada di database
app.get('/api/products/:id', async (req, res) => {
    try {
        const data = await db.select('*').from('products').where('id', req.params.id).first();

        if(!data){
            res.json({ status: 404, message: 'Product not found' });
        }

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

// membuat data produk baru dan disimpan ke database
app.post('/api/products', async (req, res) => {
    try{
        const {name, description, price} = req.body

        await db('products').insert({
            name: name,
            description: description,
            price: price
        })

        res.status(201).json({status: 201, message: 'product successfully added'})
    } catch (error) {
        res.json({
            status : 500,
            message: error.message
        });
    }
})

// memperbarui data produk yang ada di database
app.put('/api/products/:id', async (req, res) => {
    try{
        const {name, description, price} = req.body

        await db('products').where('id', req.params.id).update({
            name: name,
            description: description,
            price: price
        })

        res.status(201).json({status: 201, message: 'product successfully updated'})
    } catch (error) {
        res.json({
            status : 500,
            message: error.message
        });
    }
})

// menghapus data produk yang ada di database
app.delete('/api/products/:id', async (req, res) => {
    try{
        const id = await db('products').where('id', req.params.id).delete().returning('id')

        res.status(201).json({status: 201, message: 'product successfully deleted'})
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