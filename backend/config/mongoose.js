const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('mongoDb is connected');
}).catch((err)=>{
    console.log('Erroe Connecting to mongoDb',err)
});