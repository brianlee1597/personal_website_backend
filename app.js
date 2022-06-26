const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { createTransport } = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors(), bodyParser.json());

const ts = createTransport({
    host: process.env.HOST,
    port: parseInt(process.env.MAIL_PORT),
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    }
})

app.post("/send_email", (req, res) => {
    const post_url = req.get("origin");
    const allowed_url = process.env.URL;

    if (!post_url ?? !post_url.includes(allowed_url)) {
        console.log(post_url, allowed_url);
        res.status(401).json(`Unauthorized`);
        return;
    }

    const message = {
        from: req.body.from,
        to: process.env.BRIAN_CONTACT,
        subject: `${process.env.TITLE} - ${req.body.title || ""}`,
        text: req.body.text,
    };
    
    ts.sendMail(message, (err, i) => console.log(err ? err : i));
    res.status(200).json("Successfully Sent"); 
})

const port = process.env.PORT ?? 4200;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})