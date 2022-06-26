const express = require("express");
const cors = require("cors");
const { createTransport } = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());

const ts = createTransport({
    host: process.env.HOST,
    port: parseInt(process.env.MAIL_PORT),
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    }
});

app.post("/send_email", (req, res) => {
    const req_url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    if (!req_url.includes(process.env.URL)) {
        res.status(401);
        res.send("Unauthorized");
        return;
    } //...hm

    const message = {
        from: ctx.request.body.from,
        to: process.env.BRIAN_CONTACT,
        subject: process.env.TITLE,
        text: ctx.request.body.text,
    };
    
    ts.sendMail(message, (err, i) => console.log(err ? err : i));
    
    res.status(200);
    res.send("Successfully Sent");
})

app.listen(process.env.PORT | 4200, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})