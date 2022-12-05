import { usersService, cartsService } from "../../services/index.js";
import MailingService from "../../services/mailing.js";
import { createHash } from "../../utils.js";
import local from 'passport-local';
import config from "../config.js";

const LocalStrategy = local.Strategy


//DATOS DE MAIL
const mailer = new MailingService();
var adminMail = "maxipompas@hotmail.com"

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email||!password) return res.status(400).send({status:"ERROR",error:"Valores incompletos"})
    if(email===config.session.ADMIN_EMAIL&&password===config.session.ADMIN_PWD){
        const sessionAdminUser = {
            name:"ADMIN",
            role:"admin",
            id:'0'
        }
        const traigoaluser = await usersService.getUserByEmail(email)
        const agarroelid = traigoaluser._id

        const actualizoelrol = await usersService.updateUser(agarroelid, sessionAdminUser)
        return res.send({status:"SUCCES",message:'Logueado como administrador'})
    }

    res.status(200).send({ status: 'SUCCES', message: 'Logeado como usuario', payload: email})
}

const register = async (req, res) => {

    if (!req.file) return res.status(500).send({ status: "ERROR", error: 'Error al cargar imagen' });


    const { name, email, password, address, age, phone } = req.body;


    if (!name || !email || !password || !address || !age || !phone) return res.send({ status: "ERROR", error: "Valores incompletos" });


    let exists = await usersService.getUserByEmail(email);

    if (exists) return res.send({ status: "ERROR", error: "El usuario ya existe" });

    const cart = await cartsService.createCart();

    const mailer = new MailingService();
    let resultMail = await mailer.sendSimpleMail({
        from: 'test',
        to: adminMail,
        subject: 'Test',
        html: `<div>
                <h1>Nuevo registro de usuario</h1></br>
                <h3>Nombre: ${name}</h3></br>
                <h3>Email: ${email}</h3></br>
                <h3>Password: ${password}</h3></br>
                <h3>Direccion: ${address}</h3></br>
                <h3>Edad: ${age}</h3></br>
                <h3>Telefono: ${phone}</h3>
                </div>`            })

    const hashedPassword = await createHash(password);

    const user = {
        name,
        email,
        password: hashedPassword,
        address,
        age,
        phone,
        cart: cart._id,
        avatar: `${req.protocol}://${req.hostname}:8080/img/${req.file.filename}`
    }


    const result = await usersService.saveUser(user);

    return res.send({ status: 'SUCCES', message: 'Usuario creado correctamente', payload: result })
}

export default {
    register,
    login
}