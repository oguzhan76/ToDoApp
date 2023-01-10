const express = require('express');
// const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);


const app = express();

const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, '../build');



app.use(express.static(buildPath));



app.get('/', (req, res) => {

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