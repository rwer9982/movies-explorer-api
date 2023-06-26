const userRouter = require('express').Router();
const { joiErrorsUpdateUserInfo } = require('../errors/joiErrors');

const {
  updateUserInfo,
  getUserInfo,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', joiErrorsUpdateUserInfo, updateUserInfo);

module.exports = userRouter;
