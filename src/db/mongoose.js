const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     }, 
//     age: {
//         type: Number
//     }
// });

// const me = new User({
//     name: 'Danni',
//     age: 30
// });

// me.save().then(() => {
//     console.log(me);
// }).catch( (error) => {
//     console.log('Error', error);
// });

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });

// const task = new Task({
//     description: '30 minutes on treadmill',
//     completed: false
// })

// task.save().then(() => {
//     console.log(exercise);
// }).catch( error => {
//     console.log(error);
// });
