import { cartsService } from "../../services/index.js";
import MailingService from "../../services/mailing.js";
import twilio from "twilio";


const mailer = new MailingService();
var adminMail = "maxipompas@hotmail.com"


const accountSid = 'AC3c57f0fcd707fa9b7104e4014260d7e2'
// const authToken = '0aff51c4f3c00e1d196d33293b6afbb6'
const authToken = '16e9b1b245bea8e061c12d776f41a86d'
const client = twilio(accountSid, authToken)


const updateCart = async (req, res) => {

    const userCartId = req.user.cart._id
    console.log(userCartId);
    const productsCartId = await cartsService.getCartById(userCartId)
    const productListCart = productsCartId?.products
    const elemento = req.body
    console.log(productsCartId);
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


    return res.send({ status: 'success', carritovacio: productsCartId })
}

export default {
    updateCart,
    generateOrder
}