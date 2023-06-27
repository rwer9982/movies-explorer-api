const movieRouter = require('express').Router();
const { joiErrorsCreateMovie, joiErrorsFindMovieId } = require('../errors/joiErrors');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', joiErrorsCreateMovie, createMovie);
movieRouter.delete('/:movieId', joiErrorsFindMovieId, deleteMovie);

module.exports = movieRouter;
