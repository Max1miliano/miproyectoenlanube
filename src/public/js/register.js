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
        console.log(json);
        form.reset()
    });
    // fetch('/register',{
    //     method:'POST',
    //     body: JSON.stringify(obj)
    // }).then(result=>result.json()).then(json=>{
    //     console.log(json);
    //     form.reset()
    // });
})