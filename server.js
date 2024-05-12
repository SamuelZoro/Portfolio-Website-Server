const cors = require('cors');
require("dotenv").config();

const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.sendGridAPIKey);

const express = require('express');
const app = express();

// Define a route handler for the health check path
app.get('/health', (req, res) => {
    // Respond with a 200 OK status and the text "Healthy"
    res.status(200).send('Healthy');
});

app.use(cors({
  origin: 'https://www.luciusramirez.com', // Update this with your frontend domain
  methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify the allowed headers
}));

process.env

const PORT = process.env.PORT || 3000;


app.use(express.json())

//print message
app.get('/', (req, res)=>{
    res.send('Nothing to see here, this is the backend.')
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
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent');
            res.send('success');
        }
    })

})

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server running on port ${PORT}`)
})
