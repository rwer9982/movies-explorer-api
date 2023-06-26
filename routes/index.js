const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');

router.use('/movies', auth, moviesRouter);
router.use('/users', auth, usersRouter);
router.use('/', auth, (req, res, next) => {
  next(new NotFoundError('ошибка пути'));
});

module.exports = router;
