const express = require('express');
const app = express();
const db = require('./db/db');
const orderRouter = require('./routes/orderRoutes')
app.use(express.json());

app.set('view-engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.use(orderRouter)

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
            res.json({ status: 404, message: 'Produk tidak ditemukan!' });
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

        res.status(201).json({status: 201, message: 'Produk berhasil ditambahkan!'})
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

        res.status(201).json({status: 201, message: 'Produk berhasil diperbarui!'})
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

        res.status(201).json({status: 201, message: 'Produk berhasil dihapus!'})
    } catch (error) {
        res.json({
            status : 500,
            message: error.message
        });
    }
})

// membaca semua data order yang ada di database
app.get('/api/orders', async (req, res) => {
    try {
        const data = await db.select('*').from('orders');

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

// membaca data order yang ada di database
app.get('/api/orders/:id', async (req, res) => {
    try {
        const data = await db.select('*').from('orders').where('id', req.params.id).first();

        if(!data){
            res.json({ status: 404, message: 'Data tidak ditemukan!' });
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

// membuat data order baru dan disimpan ke database
app.post('/api/orders', async (req, res) => {
    try{
        const {product_name, quantity, name, telephone, address} = req.body
        
        const product = await db('products').where('name', req.body.product_name).first();

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

        res.status(201).json({status: 201, message: 'Data order berhasil ditambahkan!'})
    } catch (error) {
        res.json({
            status : 500,
            message: error.message
        });
    }
})

// memperbarui data order yang ada di database
app.put('/api/orders/:id', async (req, res) => {
    try{
        const {product_name, quantity, name, telephone, address} = req.body
        
        const product = await db('products').where('name', req.body.product_name).first();

        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        const total_amount = product.price * quantity;
        
        await db('orders').where('id', req.params.id).update({
            product_id: product.id,
            product_name: product.name,
            quantity: quantity,
            total_amount: total_amount,
            name: name,
            telephone: telephone,
            address: address
        })

        res.status(201).json({status: 201, message: 'Data order berhasil diperbarui!'})
    } catch (error) {
        res.json({
            status : 500,
            message: error.message
        });
    }
})

// menghapus data order yang ada di database
app.delete('/api/orders/:id', async (req, res) => {
    try{
        const id = await db('orders').where('id', req.params.id).delete().returning('id')

        res.status(201).json({status: 201, message: 'Data order berhasil dihapus!'})
    } catch (error) {
        res.json({
            status : 500,
            message: error.message
        });
    }
})

const PORT = 3001;
app.listen(PORT, (req, res)=> {
    console.log(`Listening on port ${PORT}`)
})