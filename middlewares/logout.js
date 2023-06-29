const logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Выход успешен' });
  next();
};

module.exports = { logout };
