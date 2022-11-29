import { Router } from "express";

const router = Router()

//ADMIN DE NEGOCIO
router.get('/',(req, res) => {
    const mandofotodeperfil = req.user.avatar
    res.render('admin', {css: '/css/main.css', mandofotodeperfil})
})

export default router