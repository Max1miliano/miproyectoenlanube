const form = document.getElementById('productForm');

form.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(form);
    fetch('/productos',{
        method:'POST',
        body: data
    }).then(result=>result.json()).then(json=>{
        console.log(json);
    });
    Swal.fire({
        title: 'Producto agregado correctamente',
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
        window.location = "http://localhost:8080/admin"
    })
})