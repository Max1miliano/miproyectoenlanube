
const cardContainer = document.querySelectorAll('#productContainer')

cardContainer.forEach(card => {
    const cadaNodo = card.children

    const productId = cadaNodo[0].textContent

    const productTitle = cadaNodo[2].textContent

    const productPrice = cadaNodo[4].textContent

    const productoElegido = {
        productId,
        productTitle,
        productPrice
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
        })
    })
})