import { Router } from "express";
import uploader from "../services/uploader.js";
import productController from '../config/controllers/products.controller.js'

import { productsServices } from '../services/index.js'

const router = Router();

router.post('/productos', uploader.single('image'), productController.createProduct)

export default router