const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./configs/passport_config');
const mongoose = require('mongoose');
const keys = require('./configs');
const authRoutes = require('./routes');
const app = express();

//setup cookie session
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.cookieKey]
}));

//initialize passport 
app.use(passport.initialize());
app.use(passport.session());


//connect to mongodb

mongoose.connect(keys.mongoURI,{useNewUrlParser:true},() =>{
    console.log('Connected to database');
});

app.use('/auth',authRoutes.auth);

app.get('/',(req,res)=>{
    res.status(200).send('Server is running');
});

app.listen(4000,()=>{
    console.log('Server is running o port 4000');
})
