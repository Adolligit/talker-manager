const rescue = require('express-rescue');

const HTTP_STATUS_BAD_REQUEST = 400;

module.exports = rescue((req, _res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return next({
      status: HTTP_STATUS_BAD_REQUEST,
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return next({
      status: HTTP_STATUS_BAD_REQUEST,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  
  next();
});