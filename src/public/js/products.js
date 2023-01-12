
const cardContainer = document.querySelectorAll('#productContainer')

cardContainer.forEach(card => {
    const cadaNodo = card.children

    const productId = cadaNodo[0].textContent

    const productTitle = cadaNodo[2].textContent

    const productDescription = cadaNodo[3].textContent

    const productPrice = cadaNodo[4].textContent

    const productoElegido = {
        productId,
        productTitle,
        productPrice,
        productDescription
    }

    const productButtonAddToCart = cadaNodo[5]
    productButtonAddToCart.addEventListener('click', evt => {

        fetch('/cart', {
            method: 'POST',
            body: JSON.stringify(productoElegido),
            headers: {
                "Content-type": "application/json"
            }
        }).then(result => result.json()).then(json => {
            console.log(json);
            Swal.fire({
                title: 'Producto agregado al carrito',
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
            })
        })
    })
})


const sumar = document.getElementById('agregar')
const restar = document.getElementById('descontar')
const inputvalue = document.getElementById('cantidad')
var cantidad = 0
const stock = document.getElementById('stock').textContent

function increment() {
    if (cantidad < stock) {
        cantidad++
        inputvalue.innerHTML = cantidad
    }
}

function decrement() {
    if (cantidad > 0) {
        cantidad--
        inputvalue.innerHTML = cantidad
    }
}

const enviarCantidad = document.getElementById('enviarcantidad')

const idDetalle = document.getElementById('idProduct').textContent
const tituloDetalle = document.getElementById('titleProduct').textContent
const precioDetalle = document.getElementById('priceProduct').textContent
const descripcionDetalle = document.getElementById('descriptionProduct').textContent
const cantidadDetalle = document.getElementById('titleProduct').textContent


enviarCantidad.addEventListener('click', evt => {
    const cuantosproductos = {
        productId: idDetalle,
        quantity: cantidad,
        productTitle: tituloDetalle,
        productPrice: precioDetalle * cantidad,
        productDescription: descripcionDetalle
    }

    fetch('/cart', {
        method: 'POST',
        body: JSON.stringify(cuantosproductos),
        headers: {
            "Content-type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        console.log(json);
        Swal.fire({
            title: 'Producto agregado al carrito',
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
        })
    })
})
