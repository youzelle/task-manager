const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server is up on port: " + port);
});

// const Task = require('./models/task');
// const User = require('./models/user')

// const main = async () => {
//     const user = await User.findById('5cd00232d324a8217dc98fe4');
//     await user.populate('tasks').execPopulate('5cd00232d324a8217dc98fe4');
//     console.log(user.tasks);
// }

// main();


