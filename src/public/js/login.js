const form = document.getElementById('loginForm');

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {}
    data.forEach((value, key) => obj[key] = value);
    fetch('/login', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        // console.log(json);
        if (json.status == 'ERROR') {
            let timerInterval
            Swal.fire({
                title: 'El usuario o la contraseña son invalidos',
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
                    console.log('')
                }
                window.location = "http://localhost:8080/login"
            })
            console.log(json.userLogin);
        } else {
            let timerInterval
            Swal.fire({
                title: 'Sesion iniciada con éxito',
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
                    console.log('')
                }
                window.location = "http://localhost:8080/" 
            })
        }
    })
    
})