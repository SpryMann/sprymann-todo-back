const db = require("./../models");
const Collection = db.collections;

const verifyPost = (req, res, next) => {
  const { title, icon, color } = req.body;

  if (!title || !icon || !color) {
    return res.status(400).json({
      message: "Все поля должны быть заполнены",
    });
  }

  next();
};

const verifyId = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Поле id должно быть указано",
    });
  }

  Collection.findOne({
    where: {
      id,
    },
  }).then((collection) => {
    if (!collection) {
      return res.status(400).json({
        message: "Такой коллекции нет",
      });
    }

    next();
  });
};

const userHasAccessToCollection = (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  Collection.findOne({ where: { id } }).then((collection) => {
    if (collection.userId !== userId) {
      return res.status(400).json({
        message: "Нет доступа",
      });
    }

    next();
  });
};

module.exports = {
  verifyPost,
  verifyId,
  userHasAccessToCollection,
};
