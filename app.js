const express = require('express')
const app = express();

const tasks = require('./Routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

//middlewares
app.use(express.static('./public'))
app.use(express.json())

// Routes

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening at port ${port}...`));

    } catch (error) {
        console.log(error);
    }
}

start();
