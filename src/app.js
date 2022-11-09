import express from 'express'
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import __dirname from './utils.js';

import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/user.router.js';  


const app = express(); 
const PORT = process.env.PORT || 8080; 
const server = app.listen(PORT, ()=> {console.log(`Escuchando en el puerot ${PORT}`)})
const connection = mongoose.connect('mongodb+srv://maximan:L0quill00@miproyectoenlanube.pno2dra.mongodb.net/miproyectoenlanube?retryWrites=true&w=majority').then(() => console.log('Conectado a mongo')).catch((error) => console.log(error))
 
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(session({
    secret:'c0derSecretConpapasquesitoYunaMalteada',
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://maximan:L0quill00@miproyectoenlanube.pno2dra.mongodb.net/miproyectoenlanube?retryWrites=true&w=majority",
        ttl:3600
    }),
    resave:false,
    saveUninitialized:false
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter); 
app.use('/', usersRouter);