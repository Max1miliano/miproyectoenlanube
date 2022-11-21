const form = document.getElementById('registerForm');

form.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log(obj);
    fetch('/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>{
        // Swal.fire({
        //     title: 'Usuario registrado correctamente',
        //     timer: 2000,
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
        //     window.location = "http://localhost:8080/"
        // })

        if (json.status == 'error') {
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
                window.location = "http://localhost:8080/"
            })
        }
        
    });
   
})