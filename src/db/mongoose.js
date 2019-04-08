const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

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

const me = new User({
    name: '   Danni   ',
    email: 'MYEMAIL@me.io  ',
    password: 'Hello1234'
});

me.save().then(() => {
    console.log(me);
}).catch( (error) => {
    console.log('Error', error);
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Task({
    description: '30 minutes on treadmill',
    completed: false
})

task.save().then(() => {
    console.log(task);
}).catch( error => {
    console.log(error);
});
