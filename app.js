const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { createTransport } = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json())

const ts = createTransport({
    host: process.env.HOST,
    port: parseInt(process.env.MAIL_PORT),
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    }
})

app.post("/send_email", (req, res) => {
    if (!req.get("origin").includes(process.env.URL)) {
        res.status(401).json(`Unauthorized`);
        return;
    } //...hm

    const message = {
        from: req.body.from,
        to: process.env.BRIAN_CONTACT,
        subject: process.env.TITLE,
        text: req.body.text,
    };
    
    ts.sendMail(message, (err, i) => console.log(err ? err : i));
    res.status(200).json("Successfully Sent"); 
})

const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})