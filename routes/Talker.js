const express = require('express');
const validSpeaker = require('../middlewares/auth/validSpeaker');
const validToken = require('../middlewares/auth/token/ValidToken');
const ErrorHandler = require('../middlewares/error/ErrorHandler');
const { read, write } = require('../utils/CreateReadFS');

const router = express.Router();
const HTTP_OK_STATUS = 200;
const file = 'talker.json';

router.get('/', async (_req, res) => {
  const data = await read(file);

  return res
  .status(HTTP_OK_STATUS)
  .json((data.length) ? JSON.parse(data, null, 2) : []);
});

router.get('/search', validToken, async (req, res) => {
  const arrData = JSON.parse(await read(file));
  const { q } = req.query;

  if (!q) return res.status(HTTP_OK_STATUS).json(arrData);

  const search = arrData.filter(({ name }) => name.includes(q));

  if (!search) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(search);
});

router.get('/:id', async (req, res) => {
  const arrData = JSON.parse(await read(file));
  const { id } = req.params;
  const found = arrData.find((data) => data.id === +id);
  
  if (!found) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(found);
});

router.use(validToken);

router.post('/', validSpeaker, async (req, res) => {
  const arrData = JSON.parse(await read(file));

  req.body.id = arrData.length + 1;

  arrData.push(req.body);  
  write(file, arrData);

  res.status(201).json(arrData[arrData.length - 1]);
});

router.put('/:id', validSpeaker, async (req, res) => { 
  console.log('valid token');
  const { id } = req.params;
  const arrData = JSON.parse(await read(file));
  const index = arrData.findIndex((data) => +data.id === +id);
  
  arrData[index] = { ...arrData[index], ...req.body };
  
  write(file, arrData);
  
  res.status(HTTP_OK_STATUS).json(arrData[index]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  let arrData = JSON.parse(await read(file));

  arrData = arrData.filter((e) => +e.id !== +id);
  write(file, arrData);

  res.status(204).end();
});

router.use(ErrorHandler);

module.exports = router;