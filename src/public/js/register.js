const form = document.getElementById('registerForm');

const elementPassword = document.getElementById('secondPassword')

elementPassword.addEventListener("keyup", () => {
    const firstPassword = document.getElementById('firstPassword').value
    const secondPassword = document.getElementById('secondPassword').value
    const submitButton = document.getElementById('submitButton')

    if (firstPassword != secondPassword) {
        document.getElementById('validationText').style.display = 'block';
        document.getElementById('validationText').style.color = 'red';
        submitButton.disabled = true
        submitButton.style.opacity = '0.4'
        submitButton.style.cursor = 'not-allowed'
    } else {
        document.getElementById('validationText').style.display = 'none';
        submitButton.disabled = false
        submitButton.style.opacity = '1'
        submitButton.style.cursor = 'pointer'
    }
})

form.addEventListener('submit', evt => {
    evt.preventDefault();
    let data = new FormData(form);
    fetch('/register', {
        method: 'POST',
        body: data
    }).then(result => result.json()).then(json => {

        console.log(json);
        if (json.status == 'ERROR') {
            Swal.fire({
                title: 'Algunos datos ingresados son invalidos',
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
                window.location = "http://localhost:8080/register"
            })
        } else {
            Swal.fire({
                title: 'Usuario registrado correctamente',
                timer: 2000,
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
                window.location = "http://localhost:8080/login"
            })
        }

    });
})