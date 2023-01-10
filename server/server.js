const express = require('express');
// const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');
const exp = require('constants');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);



const app = express();

const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, '../build');


app.use(express.json());
app.use(express.static(buildPath));



app.post('/signup', async (req, res) => {
    // console.log(req.body);
    const user = new User(req.body);
    await user.save();
    console.log(user);
    res.status(201).send(user);
});

app.get('/deneme', (req, res) => {
    res.send({success: 'basarili'});
})

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(port, () => console.log(`server is on ${port}` ));



// const corsOptions = {
//     origin: '127.0.0.1',
//     optionsSuccessStatus: 200
// }

// database username: oguzhan
// password: GJsTTvGq2GoPeZJR