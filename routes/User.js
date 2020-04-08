const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (userID) => {
    return JWT.sign({
        iss: 'WeatherApp',
        sub: userID
    }, 'HyggeWeatherApp', {expiresIn:'1h'})
}

userRouter.post('/register', (req, res) => {
    const {username, password} = req.body;
    User.findOne({username}, (err, user) => {
        if(err) {
            res.status(500).json({message:{msgBody:'Ooops something went erong...', msgError:true}});
        }
        if(user) {
            res.status(400).json({message:{msgBody:'Username already exists ...', msgError:true}});
        
        }else{
            const newUser = new User({username, password})
            newUser.save( err => {
                if(err) 
                    res.status(500).json({message:{msgBody:'Oh no error...', msgError:true}});
                else
                res.status(201).json({message:{msgBody:'Wohoooo account created!!', msgError:false}});
                
            })
        }
    })
})

userRouter.post('/login',passport.authenticate('local', {session:false}), (req, res) => {
    //automatic from passport - bool - attach user in passport.js local strategy
    if(req.isAuthenticated()) {
        const {_id, username} = req.user;
        const token = signToken(_id);
        //security from attacks
        res.cookie('access_token', token, {httpOnly:true, sameSite:true});
        res.status(200).json({isAuthenticated:true, user:{username}})
    }
})

userRouter.get('/logout',passport.authenticate('jwt', {session:false}), (req, res) => {
    res.clearCookie('access_token');
    res.json({user:{username:''}, success:true})
})

userRouter.get('/authenticated',passport.authenticate('jwt', {session:false}), (req, res) => {
    const {username} = req.user;
    res.status(200).json({isAuthenticated: true, user:{username}})
})




module.exports = userRouter;