const enviarCompra = document.getElementById('buyItems')


enviarCompra.addEventListener('click', () => {
    fetch('/cartBuy', {
        method: 'POST',
    }).then(result => result.json()).then(json => {
        console.log(json);
        Swal.fire({
            title: 'Gracias por tu pedido, redirigiendo al inicio',
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            window.location = "http://localhost:8080/"
        })
    })
})

const deleteProduct = document.getElementById('deleteProductFromCart')

deleteProduct.addEventListener('click', () => {
    const data = document.getElementById('productIdFromCart').textContent
    const itemId = {
        data
    }
    console.log(data);
    fetch('/cart', {
        method: 'DELETE',
        body: JSON.stringify(itemId),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        console.log(json);
        Swal.fire({
            title: 'Producto borrado del carrito',
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            window.location = "http://localhost:8080/cart"
        })
    })
})
