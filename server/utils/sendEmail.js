import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config()
const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

let transporter=nodemailer.createTransport({
    host:'smpt-mail.outlook.com',

    auth:{
        user:AUTH_EMAIL,
        pass:AUTH_PASSWORD
    }
})

