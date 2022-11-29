import passport from "passport";
import local from 'passport-local';
import { createHash, isValidPassword } from "../utils.js";
import { usersService, cartsService } from '../services/index.js'
import MailingService from "../services/mailing.js";

const LocalStrategy = local.Strategy
const mailer = new MailingService();


var adminMail = "maxipompas@hotmail.com"

const initializePassport = () => {

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        if (!email || !password) return done(null, false, { message: "Incomplete values" })
        let user = await usersService.getUserByEmail(email);
        if (!user) return done(null, false, { message: "Incorrect credentials" })
        if (!isValidPassword(user, password)) return done(null, false, { message: "Incorrect password" });
        return done(null, user);
    }))

    passport.use('logout', new LocalStrategy({ usernameField: 'email' }, async (email, done) => {
        let userDeleted = await usersService.deleteUserByEmail(email)
        return done(null, userDeleted);
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let result = await usersService.getUserById(id)
        return done(null, result);
    })
}

export default initializePassport;
