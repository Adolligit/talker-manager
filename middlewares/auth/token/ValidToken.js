const rescue = require('express-rescue');

const HTTP_STATUS_UNAUTHORIZED = 401;

module.exports = rescue((req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    console.log('valid token');
    return next({
      status: HTTP_STATUS_UNAUTHORIZED, 
      message: 'Token não encontrado',
    });
  }
  
  if (authorization.length !== 16) {
    return next({
      status: HTTP_STATUS_UNAUTHORIZED, 
      message: 'Token inválido',
    });
  }

  next();
});