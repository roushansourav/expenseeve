const router = require('express').Router();
const passport = require('passport');

router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.send('call back uri');
});
module.exports = router;