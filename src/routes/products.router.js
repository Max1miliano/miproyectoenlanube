import { Router } from "express";
import uploader from "../services/uploader.js";
import productController from '../config/controllers/products.controller.js'

import { productsServices } from '../services/index.js'

const router = Router();

router.post('/productos', uploader.single('image'), productController.createProduct)

router.delete('/productos', productController.deleteProduct)

router.put('/productos', uploader.single('image'), productController.updateProduct)

// router.patch('/productos', uploader.single('image'), productController.updateProduct)

export default router