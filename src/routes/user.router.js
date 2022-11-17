import { Router } from "express";
// import sessionController from '../controllers/session.controller.js';
import passport from "passport";
import { usersService } from "../services/index.js";


const router = Router();

// LOGIN 
router.post('/login',passport.authenticate('login',{failureRedirect:'/loginfail'}),async(req,res)=>{
    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.send({status:'success',payload:req.session.user})
})

// REGISTRO 
router.post('/register',passport.authenticate('register',{failureRedirect:'/registerfail'}),async (req,res)=>{
    res.send({status:"success", payload:req.user._id});
})

// LOGOUT 
router.delete('/logout', (req, res) => {
    req.session.destroy(err=>{
        if(err) return res.send("Couldn't log out try again");
        else return res.send("Logged out :)");
    })
})

router.delete('/delete')







export default router