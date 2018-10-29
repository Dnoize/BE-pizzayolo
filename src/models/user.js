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
        validate: [Validator.isEmail, "Adresse email invalide"]
    },
    password: {
        type: String,
        required: 'You must specify an password',

    },
    telephone: {
        type: Number,
        required: 'You must specify an phone number',

    },
    street: {
        type: String
    },
    number: {
        type: Number
    },
    cp: {
        type: Number
    },
    boite: {
        type: Number
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    role: {
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