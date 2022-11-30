import dotenv from 'dotenv'
dotenv.config()

export default {
    app:{
        DOMAIN:process.env.DOMAIN
    },
    session:{
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PWD:process.env.ADMIN_PWD
    },
    mongo:{
        USER:process.env.MONGO_USER,
        PWD:process.env.MONGO_PWD,
        DB:process.env.MONGO_DATABASE
    },
    twillio: {
        ACT: process.env.TWILIO_ACCOUNT_SID,
        PWD: process.env.TWILIO_AUTH_TOKEN
    }
}
