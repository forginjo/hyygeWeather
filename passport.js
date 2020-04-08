// MIDDLWARE for login and auth

const passport = require('passport');

//Local strategy for login
const LocalStrategy = require('passport-local').Strategy;
//JWT
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

//extracting token from request
const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['access_token']
    }
    return token;
}

// authorization with jwt
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey:"HyggeWeatherApp"
},(payload, done)=> {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err) {
            return done(err, false)
        }
        if(user) {
            return done(null, user)
        }else{
            return done(null, false)
        }
    })
} ))



//user and pass comming from client, auth strategy
passport.use(new LocalStrategy((username, password, done)=> {
    //Mongoose function
     User.findOne({username}, (err, user)=>{
         //error in DB
         if(err) {
             return done(err)
         }
         //there is no username in DB
         if(!user) {
             return done(null, false)
         }
         //checking password
         user.comparePassword(password, done);

     })
}))