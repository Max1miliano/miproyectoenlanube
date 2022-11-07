import express from 'express'
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/user.router.js'
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import config from './config/config.js';
import dotenv from 'dotenv'  

const app = express();
const PORT = process.env.PORT || 8080; 

const server = app.listen(PORT, ()=> {console.log(`Escuchando en el puerot ${PORT}`)})

server.on('error', error => console.log(`Error en servidor ${PORT}`))

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars');


app.use('/', viewsRouter);
app.use('/', usersRouter);