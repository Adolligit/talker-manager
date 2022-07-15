module.exports = (req, res, next) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  
  // sim, essa é minha verificação! kekw
  if (email.split('@').length !== 2 || email.split('.com').length !== 2) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};