import axios from 'axios'


const getPrimeraPeticion = () =>{
    return axios.get('http://localhost:8080/productos');
}

Promise.all(getPrimeraPeticion())
.then(results =>{
    const response1 = results[0].data;
    console.log(response1);
}).catch(error)