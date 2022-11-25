import { Router } from "express";
import passport from "passport";
const router = Router();
import twilio from "twilio";
import MailingService from "../services/mailing.js";
import uploader from "../services/uploader.js";
import productController from '../config/controllers/products.controller.js'
import viewsController from '../config/controllers/views.controller.js'
import { productsServices, cartsService, usersService } from '../services/index.js'



var adminMail = "maxipompas@hotmail.com"

const accountSid = 'AC3c57f0fcd707fa9b7104e4014260d7e2'
// const authToken = '0aff51c4f3c00e1d196d33293b6afbb6'
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

// CARRITO 
router.get('/cart', viewsController.cart)

//CONTACTO
router.get('/contacto', viewsController.contacto)

export default router