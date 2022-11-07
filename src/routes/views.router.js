import { Router } from "express";
import mongoose from "mongoose";
import usersService from "../models/users.js";
import dotenv from 'dotenv'

const router = Router();
mongoose.connect('mongodb+srv://maximan:L0quill00@miproyectoenlanube.pno2dra.mongodb.net/miproyectoenlanube?retryWrites=true&w=majority').then(() => console.log('Conectado a mongo')).catch((error) => console.log(error))

// enpoind para mosotrar pagina de inicio de sesion 
router.get('/', (req, res) => {
    res.render('login');
})

//endpoint para ver los usuarios registrados
router.get('/users',async (req,res)=>{
    let users = await  usersService.find();
    res.send(users);
})

export default router