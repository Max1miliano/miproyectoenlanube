import express from 'express'

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=> {console.log(`Escuchando en el puerot ${PORT}`)})
server.on('error', error => console.log(`Error en servidor ${PORT}`))

app.get('/mensaje', (req,res) => {
    res.send('Hola que tal')
})