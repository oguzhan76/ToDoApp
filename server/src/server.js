// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
const apiRouter = require('./routers/apiRouter');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);


const app = express();

const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, '../../build');
// const corsOptions = {
//     origin: '127.0.0.1',
//     optionsSuccessStatus: 200
// }

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(buildPath));
app.use(authRouter);
app.use(apiRouter);


app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => console.log(`server is on ${port}` ));