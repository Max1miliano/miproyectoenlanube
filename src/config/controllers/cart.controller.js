import { cartsService } from "../../services/index.js";
import MailingService from "../../services/mailing.js";
import twilio from "twilio";
import config from "../config.js";


const mailer = new MailingService();
var adminMail = "maxipompas@hotmail.com"


const accountSid = config.twillio.ACT
const authToken = config.twillio.PWD
const client = twilio(accountSid, authToken)


const updateCart = async (req, res) => {

    const userCartId = req.user.cart._id
    const productsCartId = await cartsService.getCartById(userCartId)
    const productListCart = productsCartId?.products
    const elemento = req.body
    const nuevoItemAlCarro = productListCart.push(elemento)

    await cartsService.update(userCartId, productsCartId)
 
    return res.send({ status: 'success', payload: elemento, carrito: productsCartId })
}

const generateOrder = async (req, res) => {
    const userInformation = req.user
    const mailer = new MailingService();

    const userCartId = req.user.cart._id
    const productsCartId = await cartsService.getCartById(userCartId)
    const productListCart = productsCartId.products


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
            <h3>Estado de la orden: Generada</h3></br>
            <h3>Nombre: ${userInformation.name}</h3></br>
            <h3>Email: ${userInformation.email}</h3></br>
            <h3>Direccion: ${userInformation.address}</h3></br>
            <h3>Telefono: ${userInformation.phone}</h3>
            <h1>Lista de productos:</h1>
            <ul>${cadaElemento}</ul>
            </div>`            })

    productsCartId.products = []
    
    await cartsService.update(userCartId, productsCartId)


    return res.send({ status: 'success', carritovacio: productsCartId })
}

const deleteProductFromCart = async (req, res) => {

    // me traigo el carrito del user 
    const userCartId = req.user.cart._id
    const metraigoelcarrito = await cartsService.getCartById(userCartId)

    const itemIdToDeleteFromCart = req.body.data
    const arraydeproducts = metraigoelcarrito?.products
    
    // arraydeproducts.forEach(element => {
    //     console.log(element.productTitle);
    // })
    const arraysinelproducto = arraydeproducts.filter(element => element._id != itemIdToDeleteFromCart)
    console.log(arraysinelproducto);
    console.log(metraigoelcarrito);

    const newCart = {
        _id: userCartId,
        products: arraysinelproducto
    }
    // console.log(itemIdToDeleteFromCart);
    await cartsService.update(userCartId, newCart)
    return res.send({ status: 'success', payload: arraysinelproducto, carrito: metraigoelcarrito })
}

export default {
    updateCart,
    generateOrder,
    deleteProductFromCart
}