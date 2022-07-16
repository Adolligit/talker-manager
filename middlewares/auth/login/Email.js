const rescue = require('express-rescue');

const HTTP_STATUS_BAD_REQUEST = 400;

module.exports = rescue((req, _res, next) => {
  const { email } = req.body;

  if (!email) {
    return next({
      status: HTTP_STATUS_BAD_REQUEST,
      message: 'O campo "email" é obrigatório',
    });
  }

  // sim, essa é minha verificação! kekw
  if (email.split('@').length !== 2 || email.split('.com').length !== 2) {
    return next({ 
      status: HTTP_STATUS_BAD_REQUEST,
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
});