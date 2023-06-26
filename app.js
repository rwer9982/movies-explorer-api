require('dotenv').config();
const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { createUser, login } = require('./controllers/users');
const { joiErrorsCreateUser, joiErrorsLogin } = require('./errors/joiErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = {
  origin: [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'localhost:3000',
    'https://localhost:3000',
    'http://localhost:3000',
    'localhost:3001',
    'https://localhost:3001',
    'http://localhost:3001',
    'http://rwer9982.nomoredomains.monster',
    'http://api.rwer9982.nomoredomains.monster',
    'https://rwer9982.nomoredomains.monster',
    'https://api.rwer9982.nomoredomains.monster',
  ],
  credentials: true,
  maxAge: 600,
};

app.use(cors(allowedCors));

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
  //  useNewUrlParser: true,
  //  useCreateIndex: true,
  //  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cookieParser());//
app.post('/signin', joiErrorsLogin, login);
app.post('/signup', joiErrorsCreateUser, createUser);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка сервера'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
