const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;
const ENDPOINT = ['/talker', '/login'];

async function read() {
  return fs
    .readFile('talker.json', 'utf8')
    .then((data) => data)
    .catch((e) => console.error('Erro durante a leitura do arquivo.\nErro:', e));
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(ENDPOINT[0], async (_req, res) => {
  const data = await read();

  return res
    .status(HTTP_OK_STATUS)
    .json((data.length) ? JSON.parse(data, null, 2) : []);
});

app.get(`${ENDPOINT[0]}/:id`, async (req, res) => {
  const peoples = JSON.parse(await read());
  const { id } = req.params;
  const found = peoples.find((people) => people.id === +id);

  if (!found) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(found);
});

app.post(ENDPOINT[1], (req, res) => { 
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  
  if (!(email && password)) {
    return res.status(400).json({ message: '"email" e "password" são obrigatórios' });
  }

  res.status(200).json({ token });
});

app.listen(PORT, console.log('Online'));