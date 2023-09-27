const db = require('./db/db');

async function runQuery() {
    try {
      // menambahkan data ke tabel products
      await db('products').insert([
        //menambahkan produk 1
        {
            name: 'paket ayam geprek',
            description: 'ayam geprek beserta nasi',
            price: 15000
        },
        //menambahkan produk 2
        {
            name: 'ayam geprek',
            description: 'ayam geprek',
            price: 12000
        }
      ]);
  
      console.log('Row inserted successfully.');
  
      // Select operation
      const data = await db.select('*').from('products');
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Close the database connection
      db.destroy();
    }
}

runQuery();