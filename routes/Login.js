const express = require('express');
const crypto = require('crypto');
const authEmail = require('../middlewares/auth/login/Email');
const authPassword = require('../middlewares/auth/login/Password');
const ErrorHandler = require('../middlewares/error/ErrorHandler');

const router = express.Router();

router.post(
  '/',
  authEmail,
  authPassword,
  (_req, res) => { 
    const token = crypto.randomBytes(8).toString('hex');

    res.status(200).json({ token });
  }, 
  ErrorHandler,
);

module.exports = router;