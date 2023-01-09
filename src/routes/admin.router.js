import { Router } from "express";
import { ROUTES } from '../constants/routes.js'

const router = Router()

//ADMIN DE NEGOCIO
router.get('/',(req, res) => {
    const routes = ROUTES[req.user?.role]
    const mandofotodeperfil = req.user.avatar
    res.render('admin', {css: '/css/main.css', mandofotodeperfil, routes: routes})
})

export default router