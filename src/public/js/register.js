const form = document.getElementById('registerForm');

form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {}
    data.forEach((value,key)=>obj[key]=value);
    fetch('/register',{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
})