const addProductform = document.getElementById('productForm');

addProductform.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(addProductform);
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

const deleteProductForm = document.getElementById('deleteProduct')

deleteProductForm.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(deleteProductForm);
    fetch('/productos',{
        method:'DELETE',
        body: data
    }).then(result=>result.json()).then(json=>{
        console.log(json);
    });
    Swal.fire({
        title: 'Producto borrado correctamente',
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

const updateProductForm = document.getElementById('updateProductForm')

updateProductForm.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(updateProductForm);
    fetch('/productos',{
        method:'PUT',
        body: data
    }).then(result=>result.json()).then(json=>{
        console.log(json);
    });
    // Swal.fire({
    //     title: 'Producto modificado correctamente',
    //     timer: 1500,
    //     timerProgressBar: true,
    //     didOpen: () => {
    //         Swal.showLoading()
    //         const b = Swal.getHtmlContainer().querySelector('b')
    //         timerInterval = setInterval(() => {
    //             b.textContent = Swal.getTimerLeft()
    //         }, 100)
    //     },
    //     willClose: () => {
    //         clearInterval(timerInterval)
    //     }
    // }).then((result) => {
    //     window.location = "http://localhost:8080/admin"
    // })
})