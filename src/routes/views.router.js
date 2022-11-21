import { Router } from "express";
import passport from "passport";
const router = Router();
import twilio from "twilio";
import MailingService from "../services/mailing.js";
import uploader from "../services/uploader.js";
import productController from '../config/controllers/products.controller.js'
import { productsServices, cartsService } from '../services/index.js'



var adminMail = "maxipompas@hotmail.com"

const accountSid = 'AC3c57f0fcd707fa9b7104e4014260d7e2'
const authToken = '0aff51c4f3c00e1d196d33293b6afbb6'

const client = twilio(accountSid, authToken)


// INICIO
router.get('/', (req, res) => {
    const validator = req.user
    if (validator) {
        res.render('home');
    } else {
        res.redirect('/login');
    }
})

// LOGIN 
router.get('/login', (req, res) => {
    console.log(req.body);
    res.render('login');
})
router.get('/loginfail', (req, res) => {
    const userValues = req.body
    res.status(500).send({ status: "ERROR", error: "El usuario o la contraseña son invalidos" })
})

// REGISTRO 
router.get('/register', async (req, res) => {
    res.render('register');
})

router.get('/registerfail', (req, res) => {
    console.log("Something is wrong")
    res.status(500).send({ status: "error", error: req.body })
})

// PRODUCTOS 
router.get('/productos', async (req, res) => {
    const validator = req.user
    const productList = await productsServices.getProducts()
    if (validator) {
        res.render('products', { productList });
    } else {
        res.redirect('/login');
    }
})

router.post('/productos', uploader.single('image'), productController.createProduct)

// CARRITO 
router.get('/cart', async (req, res) => {
    const userCartId = req.user.cart._id
    const productsCartId = await cartsService.getCartById(userCartId)
    const productListCart = productsCartId?.products

    const listOfProducts = req.body

    const validator = req.user
    if (validator) {
        res.render('cart', { validator, productListCart });
    } else {
        res.redirect('/login');
    }
})

router.post('/cart', async (req, res) => {

    const userCartId = req.user.cart._id
    console.log(userCartId);
    const productsCartId = await cartsService.getCartById(userCartId)
    const productListCart = productsCartId?.products
    const elemento = req.body
    console.log(productsCartId);
    const nuevoItemAlCarro = productListCart.push(elemento)

    await cartsService.update(userCartId, productsCartId)

    return res.send({ status: 'success', payload: elemento, carrito: productsCartId })
})

router.post('/cartBuy', async (req, res) => {
    const userInformation = req.user
    const mailer = new MailingService();

    const userCartId = req.user.cart._id
    const productsCartId = await cartsService.getCartById(userCartId)
    const productListCart = productsCartId.products

    console.log(productListCart);

    var cadaElemento = ""
    productListCart.forEach(element => {
        // cadaElemento += "<li>" + element._id + "</li>"
        cadaElemento += `<li>${element.productId}</li></br>
                        <li>${element.productTitle}</li></br>
                        <li>${element.productPrice}</li></br>`
    });

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
            <h1>Lista de productos:</h1>
            <ul>${cadaElemento}</ul>
            </div>`            })

    const option = await client.messages.create({
        body: `
        Nuevo pedido
        Nombre: ${userInformation.name}
        Email: ${userInformation.email}
        Telefono: ${userInformation.phone}
        Id del Carrito. ${userCartId}`,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491160332587'
    })

    productsCartId.products = []
    
    await cartsService.update(userCartId, productsCartId)
    // await cartsService.refresListProducts(userCartId, productListCart)
    // await cartsService.createCart()

    return res.send({ status: 'success', carritovacio: productsCartId })
})


//CONTACTO
router.get('/contacto', async (req, res) => {
    res.render('contact')
})

export default router