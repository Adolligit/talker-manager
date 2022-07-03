const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const endTalker = '/talker';
// const endLogin = '/login';

function read() {
  return fs
    .readFile('talker.json', 'utf8')
    .then((data) => data)
    .catch((e) => console.error('Erro durante a leitura do arquivo.\nErro:', e));
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(endTalker, async (_req, res) => {
  const data = await read();

  return res
    .status(HTTP_OK_STATUS)
    .json((data.length) ? JSON.parse(data, null, 2) : []);
});

app.listen(PORT, console.log('Online'));
