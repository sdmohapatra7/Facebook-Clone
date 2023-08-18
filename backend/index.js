const express = require('express');
require('dotenv').config();
const app = express();
const database = require('./config/mongoose');

app.use(express.json());
app.use('/',require('./routes'));
app.listen(process.env.port,(err)=>{
    if(err){
        console.log('Error Conected to Server',err);
    }
    console.log(`Server is Connected on ${process.env.port}`);
})