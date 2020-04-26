const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');


const app = express()


dotenv.config()


mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },console.log('connected to the database'))

mongoose.connection.on('error',() => {


    throw new Error('unable to connect database')
})


const PORT = process.env.PORT || 8000;


app.listen(PORT,() =>{



    console.log(`connected to ${PORT}`)
})