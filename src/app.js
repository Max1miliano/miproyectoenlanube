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

// import nodemailer from 'nodemailer'

// async function main() {
//   let testAccount = await nodemailer.createTestAccount();

//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   let info = await transporter.sendMail({
//     from: '"Maxi 👻" <maxipompas@hotmail.com>', // sender address
//     to: "delfina.barcia@yahoo.com.ar", // list of receivers
//     subject: "Te amo", // Subject line
//     text: "Hola te amo", // plain text body
//     html: "<h1><b>Te re amo</b></h1>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);