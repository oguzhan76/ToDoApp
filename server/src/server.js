const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
const apiRouter = require('./routers/apiRouter');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);

const app = express();

const corsOptions = {
    credentials: true,
    origin: true,
    exposedHeaders: 'Authorization'
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(apiRouter);

module.exports = app;