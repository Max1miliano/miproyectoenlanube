import mailer from 'nodemailer';

var MAIL_TEST = 'santicuello901@gmail.com'

export default class MailingService {
    constructor(){
        this.client = mailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: MAIL_TEST,
                pass: 'yqcetagoltfyydzd'
            }
        })
    }
    sendSimpleMail = async({from,to,subject,html,attachments=[]})=>{
        let result = await this.client.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        })
        return result;
    }
}