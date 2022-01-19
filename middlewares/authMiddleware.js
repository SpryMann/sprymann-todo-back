const db = require("./../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkNotExistsUser = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user) {
    return res.status(400).json({
      message: "Логин занят",
    });
  }

  next();
};

const checkExistsUser = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({
      message: "Пользователя с таким логином нет",
    });
  }

  req.body.user = user;

  next();
};

const verifyPassword = (req, res, next) => {
  const { password, user } = req.body;
  let validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      message: "Неверный пароль",
    });
  }

  next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "Нет токена авторизации",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Не авторизован",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const checkExistsUserById = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(400).json({
      message: "Такого пользователя нет",
    });
  }

  next();
};

module.exports = {
  checkExistsUser,
  checkNotExistsUser,
  checkExistsUserById,
  verifyPassword,
  verifyToken,
};
