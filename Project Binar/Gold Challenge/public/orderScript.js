document.getElementById('order-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const product_name = document.getElementById('product_name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const name = document.getElementById('name').value;
    const telephone = document.getElementById('telephone').value;
    const address = document.getElementById('address').value;

    try {
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
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});