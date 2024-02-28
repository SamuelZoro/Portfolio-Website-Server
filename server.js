
require("dotenv").config();

const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.sendGridAPIKey);

const express = require('express');
const app = express();


process.env

const PORT = process.env.PORT || 3000;

//access to html frontend
app.use(express.static('frontend'));
app.use(express.json())

//access to file
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/frontend/contact.html')
})

//access to data in contact form
app.post('/', (req, res)=>{
    console.log(req.body)

    const mailOptions = {
        from: 'sam@luciusramirez.com',
        to: 'sam@luciusramirez.com',
        subject: req.body.subject,
        reply_to: req.body.email,
        text: req.body.message
    }

    sendGrid.send(mailOptions, (error)=>{
        if(error){
            console.logy(error);
            res.send('error');
        } else {
            console.log('Email sent');
            res.send('success');
        }
    })

})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})