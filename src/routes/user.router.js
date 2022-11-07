import { Router } from "express";
import mongoose from "mongoose";
import usersService from "../models/users.js";

const router = Router();

//endpoint para mostrar página de registro
router.get('/register',async(req,res)=>{
    res.render('register');
})

//endpoint para registrar un usuario
router.post('/register',async(req,res)=>{
    const {name,email,password,address,age,phone} = req.body;
    if(!name||!email||!password||!address||!age||!phone) return res.status(400).send({error:"Incomplete Values"});
    let newUser = {
        name,
        email,
        password,
        address,
        age,
        phone
    }
    try{
        const userSch = usersService(newUser)
        userSch.save()
        res.send({status:"success",payload:userSch})
    }catch(error){
        res.status(500).send({status:"error",error})
        res.status(400).send({status:"error",error})
    }

    // res.send('create user')
})

export default router