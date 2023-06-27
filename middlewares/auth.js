const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { JWT_SECRET = 'key' } = process.env;

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
  } catch (err) {
    next(new AuthError('неверный токен'));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = { auth };
