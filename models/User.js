const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 6,
    max: 100,
  },
  password: {
    type: String,
    required: true,
  },
});

// CHECK if the password is already modified/ Used all function because of access the THIS

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

// BCRYPT things to chec and compare 
UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
        return cb(err);
        else{
            if(!isMatch)
            return cb(null, isMatch);
            return cb(null, this)
        }
    })
}

module.exports = mongoose.model('User', UserSchema);