import { Router } from "express";
import cartController from "../config/controllers/cart.controller.js";

const router = Router()

// router.post('/cart', async (req, res) => {

//     const userCartId = req.user.cart._id
//     console.log(userCartId);
//     const productsCartId = await cartsService.getCartById(userCartId)
//     const productListCart = productsCartId?.products
//     const elemento = req.body
//     console.log(productsCartId);
//     const nuevoItemAlCarro = productListCart.push(elemento)

//     await cartsService.update(userCartId, productsCartId)

//     return res.send({ status: 'success', payload: elemento, carrito: productsCartId })
// })

router.post('/cart', cartController.updateCart)

// router.post('/cartBuy', async (req, res) => {
//     const userInformation = req.user
//     const mailer = new MailingService();

//     const userCartId = req.user.cart._id
//     const productsCartId = await cartsService.getCartById(userCartId)
//     const productListCart = productsCartId.products

//     console.log(productListCart);

//     var cadaElemento = ""
//     productListCart.forEach(element => {
//         // cadaElemento += "<li>" + element._id + "</li>"
//         cadaElemento += `<li>${element.productId}</li></br>
//                         <li>${element.productTitle}</li></br>
//                         <li>${element.productPrice}</li></br>`
//     });

//     let resultMail = await mailer.sendSimpleMail({
//         from: 'test',
//         to: adminMail,
//         subject: `Nuevo pedido de ${userInformation.name}`,
//         html: `<div>
//             <h1>Nuevo pedido</h1></br>
//             <h3>Nombre: ${userInformation.name}</h3></br>
//             <h3>Email: ${userInformation.email}</h3></br>
//             <h3>Direccion: ${userInformation.address}</h3></br>
//             <h3>Telefono: ${userInformation.phone}</h3>
//             <h1>Lista de productos:</h1>
//             <ul>${cadaElemento}</ul>
//             </div>`            })

//     const option = await client.messages.create({
//         body: `
//         Nuevo pedido
//         Nombre: ${userInformation.name}
//         Email: ${userInformation.email}
//         Telefono: ${userInformation.phone}
//         Id del Carrito. ${userCartId}`,
//         from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+5491160332587'
//     })

//     productsCartId.products = []
    
//     await cartsService.update(userCartId, productsCartId)
//     // await cartsService.refresListProducts(userCartId, productListCart)
//     // await cartsService.createCart()

//     return res.send({ status: 'success', carritovacio: productsCartId })
// })

router.post('/cartBuy', cartController.generateOrder)
export default router