const Koa = require("koa");
const { createTransport } = require("nodemailer");
require("dotenv").config();

const app = new Koa();
const tp = createTransport({
    host: process.env.HOST,
    port: parseInt(process.env.MAIL_PORT),
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    }
});

app.use(async ctx => {
    const req_url = ctx.URL.toString();
    if (!req_url.includes(process.env.URL)) {
        ctx.status = 401;
        ctx.body = "Unauthorized";
    } //...hm

    const message = {
        from: 'testing@gmail.com',
        to: process.env.BRIAN_CONTACT,
        subject: process.env.TITLE,
        text: 'Have the most fun you can in a car. Get your Tesla today!'
    };
    
    tp.sendMail(message, (err, i) => console.log(err ? err : i));
    
    ctx.status = 200;
    ctx.body = "Successfully Sent";
});

app.listen(3000);
console.log("Server is Running");