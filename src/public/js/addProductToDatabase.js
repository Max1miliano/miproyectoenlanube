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
})