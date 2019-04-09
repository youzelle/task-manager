const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Cannot include the word "password"!');
            }
        }
    }
});

// const me = new User({
//     name: '   Danni   ',
//     email: 'MYEMAIL@me.io  ',
//     password: 'Hello1234'
// });

// me.save().then(() => {
//     console.log(me);
// }).catch( (error) => {
//     console.log('Error', error);
// });

module.exports = User;