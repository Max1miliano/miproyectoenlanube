const buttonBuy = document.getElementById('buyItems')

buttonBuy.addEventListener('click', evt=> {
    evt.preventDefault();
    fetch('/cartBuy',{
        method:'POST',
    })
})