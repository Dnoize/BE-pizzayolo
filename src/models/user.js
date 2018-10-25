const Mongoose = require("mongoose");
const PassportLocalMongoose = require("passport-local-mongoose");
const Validator = require("validator");
const Bcrypt = require("bcrypt")

const schema = new Mongoose.Schema({
    firstname: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: 'You must specify an email',
        validate: [validator.isEmail, "Adresse email invalide"]
    },
    password: {
        type: String
    },
    telephone: {
        type: Number
    },
    adress: {
        type: String
    }

})

schema.methods.generateHash = function (password) {
    return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8), null)
}

// checking if password is valid
schema.methods.validPassword = function (password, user) {
    // this.local.password ?
    // récupérer le password db
    return Bcrypt.compareSync(password, user.password)
}

schema.plugin(PassportLocalMongoose, {
    usernameField: 'email',
    passwordField: 'password',
    session: true
})

module.exports = Mongoose.model('User', schema)