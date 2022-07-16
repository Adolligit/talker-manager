const DateValidation = require('../../../utils/DateValidation');

module.exports = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  
  if (!DateValidation(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};