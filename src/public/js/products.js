const addToTheCart = document.getElementById('addToCart')
const addToTheCarrito = document.getElementsByClassName('.add-cart-button')
// const productForm = document.getElementById('productContainer')

const productTitle = document.getElementById('productTitle').innerText
const productPrice = document.getElementById('productPrice').innerText

const productoElegido = {
    productTitle,
    productPrice
}

console.log(addToTheCart);
console.log(addToTheCarrito);

addToTheCart.addEventListener('click', evt => {
    evt.preventDefault();

    // let data = new FormData(productoElegido);
    // productoElegido.forEach((value,key)=>obj[key]=value);
    console.log(productoElegido);

    fetch('/cartBuy', {
        method: 'POST',
        body: productoElegido
    }).then(result=>result.json()).then(json=>{
        console.log(json);
    })
})