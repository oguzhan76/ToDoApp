const express = require('express');
const path = require('path');

const app = express();


const buildPath = path.join(__dirname, '../build');

app.use(express.static(buildPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(5000, () => console.log('server is on port 5000'));