import { Router } from "express";

const router = Router()

//ADMIN DE NEGOCIO
router.get('/',(req, res) => {
    res.render('admin')
})

export default router