const passport = require('passport');

const keys = require('./index');
const db = require('../models');

const GoogleStrategy = require("passport-google-oauth20");
passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});



passport.use(
    new GoogleStrategy({
        clientID: keys.clientId,
        clientSecret:keys.secretKey,
        callbackURL:'/auth/google/redirect'
    },async (accessToken,refreshToken,profile,done)=>{
        
        try{

            let currentUser = await db.User.findOne({googleId:profile.id});
            
            if(currentUser)
            {
                console.log("Current user: ",currentUser);
                done(null, currentUser);
            }
            else
            {   
                const data = {
                    googleId:profile.id,
                    username:profile.displayName,
                    profile_pic:profile._json.picture,
                    occupation:'',
                    totalBudget:0,
                    email:profile.emails[0].value
                };
                let newUser = await new db.User(data)
                .save();
                
                done(null ,newUser);

            }
            
        }
        catch(err)
        {
            console.log(err);
        }
        
        
    }));
    