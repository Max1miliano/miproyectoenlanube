import { Router } from "express";
// import sessionController from '../controllers/session.controller.js';
import passport from "passport";
import { usersService } from "../services/index.js";
import uploader from "../services/uploader.js";
import sessionsController from "../config/controllers/sessions.controller.js";


const router = Router();

// LOGIN 
router.post('/login',passport.authenticate('login',{failureRedirect:'/loginfail'}), sessionsController.login)

// REGISTRO 

router.post('/register',uploader.single('avatar'), sessionsController.register)

// LOGOUT 
router.delete('/logout', (req, res) => {
    req.session.destroy(err=>{
        if(err) return res.send("Couldn't log out try again");
        else return res.send("Logged out :)");
    })
})

router.delete('/delete')







export default router