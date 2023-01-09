const logout = document.getElementById('logout');

// const categoryslist = document.getElementById('itemCart')
// // const categoryContainer = document.getElementById('categoryListContainer')
// console.log(categoryslist);
// // console.log(categoryContainer);

// categoryslist.addEventListener("pointerover", () => {
//     document.getElementById('categoryListContainer').style.display = 'grid'
// })

logout.addEventListener('click', (evt) => {
    evt.preventDefault();
    fetch('/logout', {
        method: "DELETE"
    })
    let timerInterval
    Swal.fire({
        title: 'Cerrando Sesión',
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
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
        window.location = "http://localhost:8080/login"
    })
})