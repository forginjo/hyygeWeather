const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb+srv://adminivan:adminivan@cluster0-tafhr.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, () => {console.log('succes connect to db')}
)

const userRouter = require('./routes/User')
app.use('/user', userRouter)

app.listen(5000, ()=>{console.log('express server running')})