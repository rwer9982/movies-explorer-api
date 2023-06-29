const Movie = require('../models/movieSchema');
const ValidationError = require('../errors/ValidationError');
const NoAccessError = require('../errors/NoAccessError');
const NotFoundError = require('../errors/NotFoundError');
const {
  STATUS_OK,
} = require('../errors/errors');

const createMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    // eslint-disable-next-line no-dupe-keys
    owner: ownerId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректный данные'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((users) => res.status(STATUS_OK).send(users))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById({ _id: movieId })
    .orFail(() => new NotFoundError('Запись с указанным id не существует'))
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        throw new NoAccessError('Запись может удалить только её создатель');
      }
      return Movie.findByIdAndRemove({ _id: movieId });
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректный данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
