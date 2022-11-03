import { Router } from "express";
import mongoose from "mongoose";
import usersService from "../models/users.js";

const router = Router();
// const connection = mongoose.connect('mongodb://127.0.0.1:27017/baseUsers',err=>{
//     if(err){
//         console.log("x _ X ");
//     }
//     else{
//         console.log("Connected to database :)")
//     }
// });

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',async(req,res)=>{
    const {name,email,password,address,age,phone} = req.body;
    if(!name||!email||!password||!address||!age||!phone) return res.status(400).send({error:"Incomplete Values"})
    let newUser = {
        name,
        email,
        password,
        address,
        age,
        phone
    }

    try{
        let result = await usersService.create(newUser);
        res.send({status:"success",payload:result})
    }catch(error){
        res.status(500).send({status:"error",error})
        res.status(400).send({status:"error",error})
    }
})

router.get('/users',async (req,res)=>{
    let users = await  usersService.find();
    res.send(users);
})

export default router