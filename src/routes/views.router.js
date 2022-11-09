import { Router } from "express";
import usersService from "../dao/models/users.js";

const router = Router();

// enpoind para mosotrar pagina de inicio de sesion 
router.get('/', (req, res) => {
    const validator = req.user
    if(validator) {
        res.render('home');
    } else {
        res.redirect('/login');
    }
})

//endpoint para ver los usuarios registrados
// router.get('/users',async (req,res)=>{
//     let users = await  usersService.find();
//     res.send(users);
// })

export default router