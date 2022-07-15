const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const authEmail = require('./middlewares/auth/email');
const authPassword = require('./middlewares/auth/password');
const validToken = require('./middlewares/auth/validToken');
const createSpeaker = require('./middlewares/auth/createSpeaker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;
const ENDPOINT = ['/login', '/talker'];

async function read() {
  return fs
    .readFile('talker.json', 'utf8')
    .then((data) => data)
    .catch((e) => console.error('Erro durante a leitura do arquivo.\nErro:', e));
  }
  
async function write(acc) {
  const arrData = JSON.parse(await read());
  
  acc.id = arrData.length + 1;
  arrData.push(acc);

  return fs
    .writeFile('talker.json', JSON.stringify(arrData, null, 2), { flag: 'w' })
    .then(() => console.log('Os novos dados foram inseridos com sucesso!'))
    .catch((e) => console.error('Erro durante a escrita do arquivo.\nErro:', e));
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post(ENDPOINT[0], authEmail, authPassword, (req, res) => { 
  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
});

app.get(ENDPOINT[1], async (_req, res) => {
  const data = await read();

  return res
  .status(HTTP_OK_STATUS)
  .json((data.length) ? JSON.parse(data, null, 2) : []);
});

app.get(`${ENDPOINT[1]}/:id`, async (req, res) => {
  const peoples = JSON.parse(await read());
  const { id } = req.params;
  const found = peoples.find((people) => people.id === +id);
  
  if (!found) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(found);
});

app.use(validToken);

app.post(ENDPOINT[1], createSpeaker, async (req, res) => {
  await write(req.body);
  res.status(201).json(req.body);
});

app.listen(PORT, console.log('Online'));