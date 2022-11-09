import passport from "passport";
import local from 'passport-local';
import { createHash, isValidPassword } from "../utils.js";
import { usersService, cartsService } from '../services/index.js'

const LocalStrategy = local.Strategy

const initializePassport = () =>{
    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:"email"},
    async(req,email,password,done)=>{
        try{
            const {name, address, age, phone } = req.body;

            if(!name||!email||!password||!address||!age||!phone) return res.status(400).send({status:"error",error:"Valores incompletos"});

            let exists = await usersService.getUserByEmail(email);

            if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"});

            //Anexar el carrito
            const cart = await cartsService.createCart();
            const hashedPassword = await createHash(password);
            const user ={
                name,
                email,
                password: hashedPassword,
                address,
                age,
                phone,
                cart:cart._id
            }
            const result = await  usersService.saveUser(user);
            // res.send({status:"success", payload:result})
            return done(null,result)
        }catch(error){
            done(error)
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        if(!email||!password) return done(null,false,{message:"Incomplete values"})
        let user = await usersService.getUserByEmail(email);
        if(!user) return done(null,false,{message:"Incorrect credentials"})
        if(!isValidPassword(user,password)) return done(null,false,{message:"Incorrect password"});
        return done(null,user);
    }))

    passport.use('logout',new LocalStrategy({usernameField:'email'},async(email,done)=>{
        let userDeleted = await usersService.deleteUserByEmail(email)
        return done(null, userDeleted);
    }))


    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await usersService.getUserById(id)
        return done(null,result);
    })
}

export default initializePassport;
