import { Router } from "express";
import passport from "passport";
const router = Router();
import twilio from "twilio";
import MailingService from "../services/mailing.js";


var adminMail = "maxipompas@hotmail.com"

const accountSid = 'AC3c57f0fcd707fa9b7104e4014260d7e2'
const authToken = '09c8c00e0af1afe6663665542d466f3b'

const client = twilio(accountSid, authToken)

// enpoind para mosotrar pagina de inicio de sesion 
router.get('/', (req, res) => {
    const validator = req.user
    if (validator) {
        res.render('home');
    } else {
        res.redirect('/login');
    }
})

router.get('/productos', (req, res) => {
    const validator = req.user
    let productList = req.body
    if (validator) {
        res.render('products', productList);
    } else {
        res.redirect('/login');
    }
})
router.post('/productos', (req, res) => {
    const productList = req.body
    res.render('products', productList);
})

router.get('/cart', (req, res) => {
    const validator = req.user
    if (validator) {
        res.render('cart', validator);
    } else {
        res.redirect('/login');
    }
})

router.post('/cartBuy', async (req, res) => {
    const userInformation = req.user
    const mailer = new MailingService();
    let resultMail = await mailer.sendSimpleMail({
        from: 'test',
        to: adminMail,
        subject: `Nuevo pedido de ${userInformation.name}`,
        html: `<div>
            <h1>Nuevo pedido</h1></br>
            <h3>Nombre: ${userInformation.name}</h3></br>
            <h3>Email: ${userInformation.email}</h3></br>
            <h3>Direccion: ${userInformation.address}</h3></br>
            <h3>Telefono: ${userInformation.phone}</h3>
            <h1>Lista de productos</h1>
            </div>`            })

    const option = await client.messages.create({
        body: `
        Nuevo pedido
        Nombre: ${userInformation.name}
        Email: ${userInformation.email}
        Direccion: ${userInformation.address}
        Telefono: ${userInformation.phone}
        Lista de productos:`,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491160332587'
    })

    const message = await client.messages.create({
                body: `
                Nuevo pedido
                Nombre: ${userInformation.name}
                Email: ${userInformation.email}
                Direccion: ${userInformation.address}
                Telefono: ${userInformation.phone}
                Lista de productos:`,
                from: '+17262274679',
                to: userInformation.phone
            })

    return res.send({ status: 'success'})
})

//endpoint para ver los usuarios registrados
// router.get('/users',async (req,res)=>{
//     let users = await  usersService.find();
//     res.send(users);
// })

export default router