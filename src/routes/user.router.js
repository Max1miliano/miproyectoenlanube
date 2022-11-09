import { Router } from "express";
// import sessionController from '../controllers/session.controller.js';
import uploader from '../utilsImage.js'
import passport from "passport";
import { usersService } from "../services/index.js";


const router = Router();


//endpoint para mostrar página de registro
router.get('/register',async(req,res)=>{
    res.render('register');
})
//endpoint para registrar un usuario
router.post('/register',passport.authenticate('register',{failureRedirect:'/registerfail'}),async (req,res)=>{
    res.send({status:"success", payload:req.user._id});
})
router.get('/registerfail',(req,res)=>{
    console.log("Something is wrong")
    res.status(500).send({status:"error",error: req.body})
})



// Inicia sesion bien pero no se si valida el mail y la contraseña correctamente
router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/login',passport.authenticate('login',{failureRedirect:'/loginfail'}),async(req,res)=>{
    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.send({status:'success',payload:req.session.user})
})
router.get('/loginfail',(req,res)=>{
    res.status(500).send({status:"error",error:"Error in login "})
})

router.post('/logout', passport.authenticate('logout',{failureRedirect:'/'}), (req, res) => {
    req.session.destroy(err=>{
        if(err) return res.send("Couldn't log out try again");
        else return res.send("Logged out :)");
    })
    res.redirect('login');
})

export default router