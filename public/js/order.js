document.getElementById('order-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const product_name = document.getElementById('product_name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const name = document.getElementById('name').value;
    const telephone = document.getElementById('telephone').value;
    const address = document.getElementById('address').value;

    let price = 0;
    if (product_name === 'paket ayam geprek') {
        price = 15000;
    } else if (product_name === 'ayam geprek') {
        price = 12000;
    }

    // menghitung total harga
    const total = price * quantity;

    try {
        // mengirim data ke http method rest api
        const response = await fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_name,
                quantity,
                name,
                telephone,
                address
            })
        });

        if (response.status === 201) {
            // menyembunyikan tampilan order dan menampilkan invoice
            document.getElementById('order').style.display = 'none';
            document.getElementById('invoice').style.display = 'block';

            // mengambil order_id dari respons server
            const responseData = await response.json();
            console.log('Response Data:', responseData);
            const order_id = responseData.order_id;
            console.log('Order ID:', order_id);

            // fungsi huruf kapital di awal kata
            function kapitalisasi(text) {
                return text.toLowerCase().replace(/^.|\s\S/g, (letter) => letter.toUpperCase());
            }

            // menampilkan informasi invoice
            document.getElementById('invoice-id').textContent = `00${order_id.id}`;
            document.getElementById('invoice-product').textContent = kapitalisasi(product_name);
            document.getElementById('invoice-quantity').textContent = quantity;
            document.getElementById('invoice-price').textContent = `Rp. ${price.toLocaleString()}`;
            document.getElementById('invoice-name').textContent = kapitalisasi(name);
            document.getElementById('invoice-address').textContent = kapitalisasi(address);
            document.getElementById('invoice-total-table').textContent =`Rp. ${total.toLocaleString()}`;

            // set waktu jakarta/wib
            const currentTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
            document.getElementById('invoice-time').textContent = currentTime;

            // menampilkan total pembayaran
            document.getElementById('invoice-total-payment').textContent =`Rp. ${total.toLocaleString()}`;
        } else {
            // jika status selain 201
            console.error('Order failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

//menampilkan kembali tampilan order dan menyembunyikan tampilan invoice
document.getElementById('back-to-order').addEventListener('click', function() {
  document.getElementById('order').style.display = 'block';
  document.getElementById('invoice').style.display = 'none';
});
