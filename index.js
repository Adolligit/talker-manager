const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const endTalker = '/talker';
// const endLogin = '/login';

const arrPromise = fs
  .readFile('talker.json', 'utf8')
  .then((data) => data)
  .catch((e) => console.log('Erro durante a leitura. \nErro:', e));

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(endTalker, async (req, res) => {
  const data = await arrPromise;

  return res
    .status(HTTP_OK_STATUS)
    .json((data.length) ? JSON.parse(data, null, 2) : []);
});

app.listen(PORT, console.log('Online'));
