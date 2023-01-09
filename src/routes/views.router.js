import { Router } from "express";
const router = Router();
import twilio from "twilio";
import viewsController from '../config/controllers/views.controller.js'



var adminMail = "maxipompas@hotmail.com"

const accountSid = 'AC3c57f0fcd707fa9b7104e4014260d7e2'
const authToken = '16e9b1b245bea8e061c12d776f41a86d'

const client = twilio(accountSid, authToken)

 
// INICIO
router.get('/', viewsController.home)

// LOGIN 
router.get('/login', viewsController.login)
router.get('/loginfail', viewsController.loginfail)

// REGISTRO 
router.get('/register', viewsController.register)
router.get('/registerfail', viewsController.registerFail)

// PRODUCTOS 
router.get('/productos', viewsController.products)
router.get('/categorias/:categoria', viewsController.categorys)

// CARRITO 
router.get('/cart', viewsController.cart)

//CONTACTO
router.get('/contacto', viewsController.contacto)

export default router