const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
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
