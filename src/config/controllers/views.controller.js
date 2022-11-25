import { productsServices, cartsService } from '../../services/index.js'
import { loggers } from '../../utils.js'
import {ROUTES} from '../../constants/routes.js'

//LOGGERS


const home = async (req, res) => {
    const routes = ROUTES[req.user.role];
    console.log(routes);
    const validator = req.user
    console.log(validator);
    if (validator) {
        const mandofotodeperfil = req.user.avatar

        loggers.info('Sesion iniciada correctamente')
        res.render('home', { mandofotodeperfil, routes: routes });
    } else {
        loggers.error('Algo sucedió durante el logeo')
        res.redirect('/login');
    }
    // res.render('home', {mandofotodeperfil});
}

const login = async (req, res) => {
    res.render('login');
}

const loginfail = async (req, res) => {
    loggers.warn('Algunos de los datos ingresados es incorrecto')
    res.status(500).send({ status: "ERROR", error: "El usuario o la contraseña son invalidos" })
}

const register = async (req, res) => {
    res.render('register');
}

const registerFail = async (req, res) => {
    loggers.info('Algo sucedió durante el registro')
    res.status(500).send({ status: "error", message: "Alguno de los datos ingresados es incorrecto" })
}

const products = async (req, res) => {
    const mandofotodeperfil = req.user.avatar
    const productList = await productsServices.getProducts()
    res.render('products', { productList, mandofotodeperfil })
}

const cart = async (req, res) => {
    
    const mandofotodeperfil = req.user?.avatar
    
    const userCartId = req.user?.cart._id
    const productsCartId = await cartsService.getCartById(userCartId)
    const productListCart = productsCartId?.products

    const listOfProducts = req.body

    const validator = req.user
    if (validator) {
        res.render('cart', { validator, productListCart, mandofotodeperfil });
    } else {
        res.redirect('/login');
    }
}

const contacto = async (req, res) => {
    res.render('contact')
}

export default {
    products,
    home,
    login,
    loginfail,
    register,
    registerFail,
    cart,
    contacto
}