import { Router } from "express";
import cartController from "../config/controllers/cart.controller.js";

const router = Router()

router.post('/cart', cartController.updateCart) 

router.post('/cartBuy', cartController.generateOrder)

router.delete('/cart', cartController.deleteProductFromCart)

export default router