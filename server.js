const express = require('express');
const dotenv = require('dotenv') ;
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');


// Load env vars
dotenv.config ({path:'./config/config.env'});

//Route file
const dentists = require('./routes/dentists');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');


connectDB();

const app=express();



//Body parser
app.use(express.json());

//add cookie parser
app.use(cookieParser());

//Body parser
app.use('/api/v1/dentists', dentists);
app.use('/api/v1/auth', auth);
app.use('/api/v1/appointments', appointments);

const PORT=process.env.PORT || 5000;

const server = app.listen(PORT, console. log ('Server running in ', process.env.NODE_ENV,' mode on port ', PORT)) ;

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Errow: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
});
