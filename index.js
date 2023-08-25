const express = require('express');
const bodyParser = require('body-parser');
const login = require('./routes/Login');
const talker = require('./routes/Talker');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const ENDPOINT = ['/login', '/talker'];

app.use(ENDPOINT[0], login);
app.use(ENDPOINT[1], talker);

app.listen(PORT, console.log('Online'));