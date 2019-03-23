const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String, required: true, index: {
            unique: true
        }
    },
    phone: String, 
    role: String, 
    password: {
        type: String, required: true
    },
    avatar: String, 
    tags: []
});


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);