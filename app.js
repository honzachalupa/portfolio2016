const express = require('express');
const config = require('./config');

const app = express();

app.use(express.static('www'));
app.get('/twitter', () => {
    // Return twitter response
});

app.listen(config.port);