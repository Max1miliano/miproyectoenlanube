import { productsServices, cartsService } from '../../services/index.js'
import { loggers } from '../../utils.js'
import { ROUTES } from '../../constants/routes.js'



const home = async (req, res) => {
    const routes = ROUTES[req.user?.role];
    const validator = req.user
    if (validator) {
        const mandofotodeperfil = req.user.avatar
        const productList = await productsServices.getProducts()
 
        loggers.info('Sesion iniciada correctamente')
        res.render('home', { status: 200, mandofotodeperfil, routes: routes, css: '/css/main.css', payload: productList, productList });
    } else {
        loggers.error('Algo sucedió durante el logeo')
        res.redirect('/login');
    }
}

const login = async (req, res) => {
    res.render('login', { status: 200, css: '/css/main.css' });
}

const loginfail = async (req, res) => {
    loggers.warn('Algunos de los datos ingresados es incorrecto')
    res.status(500).send({ status: "ERROR", error: "El usuario o la contraseña son invalidos" })
}

const register = async (req, res) => {
    res.render('register', { css: '/css/main.css' });
}

const registerFail = async (req, res) => {
    loggers.info('Algo sucedió durante el registro')
    res.status(500).send({ status: "error", message: "Alguno de los datos ingresados es incorrecto" })
}

const products = async (req, res) => {
    const mandofotodeperfil = req.user?.avatar
    const productList = await productsServices.getProducts()
    const routes = ROUTES[req.user?.role];

    res.render('products', { productList, mandofotodeperfil, css: '/css/main.css', routes: routes, payload: productList })
}
const productsViews = async (req, res) => {
    const productList = await productsServices.getProducts()
    res.send({ payload: productList })
}

const categorys = async (req, res) => {
    const categoryParam = req.params.categoria
    const productList = await productsServices.getProductsByCategory(categoryParam)
    // const productList = productListObject[0]
    const mandofotodeperfil = req.user?.avatar
    const routes = ROUTES[req.user?.role];
    res.render('productsByCategory', {productList, routes: routes, css: '/css/main.css', mandofotodeperfil})
}

const cart = async (req, res) => {

    const mandofotodeperfil = req.user?.avatar

    const datosDelUsuario = req.user

    console.log(datosDelUsuario);

    const userCartId = req.user?.cart._id
    const productsCartId = await cartsService.getCartById(userCartId)
    const productListCart = productsCartId?.products

    const routes = ROUTES[req.user?.role];

    const validator = req.user
    if (validator) {
        res.render('cart', { validator, productListCart, mandofotodeperfil, css: '/css/main.css', routes: routes, datosDelUsuario });
    } else {
        res.redirect('/login');
    }
}

const contacto = async (req, res) => {

    const mandofotodeperfil = req.user?.avatar
    const routes = ROUTES[req.user?.role];
    res.render('contact', { mandofotodeperfil, css: '/css/main.css', routes: routes })
}

export default {
    products,
    home,
    login,
    loginfail,
    register,
    registerFail,
    cart,
    contacto,
    productsViews,
    categorys
}