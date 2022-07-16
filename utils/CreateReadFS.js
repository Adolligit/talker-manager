const fs = require('fs').promises;

async function read(file) {
  return fs
    .readFile(file, 'utf8')
    .then((data) => data)
    .catch((e) => console.error('Erro durante a leitura do arquivo.\nErro:', e));
  }

async function write(file, content) {
  return fs
    .writeFile(file, JSON.stringify(content, null, 2), { flag: 'w' })
    .then(() => console.log('Os novos dados foram inseridos com sucesso!'))
    .catch((e) => console.error('Erro durante a escrita do arquivo.\nErro:', e));
}

module.exports = { read, write };