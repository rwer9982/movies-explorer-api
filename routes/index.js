const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { logout } = require('../middlewares/logout');
const { createUser, login } = require('../controllers/users');
const { joiErrorsCreateUser, joiErrorsLogin } = require('../errors/joiErrors');

router.post('/signin', joiErrorsLogin, login);
router.post('/signup', joiErrorsCreateUser, createUser);
router.use('/movies', auth, moviesRouter);
router.use('/users', auth, usersRouter);
router.get('/signout', auth, logout);
router.use('/', auth, (req, res, next) => {
  next(new NotFoundError('ошибка пути'));
});

module.exports = router;
