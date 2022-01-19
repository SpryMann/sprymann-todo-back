const db = require("./../models");
const Task = db.tasks;
const Collection = db.collections;

const verifyPost = (req, res, next) => {
  const { title, collectionId } = req.body;

  if (!title || !collectionId) {
    return res.status(400).json({ message: "Все поля должны быть заполнены" });
  }

  next();
};

const verifyCollectionId = (req, res, next) => {
  const { collectionId } = req.params;
  Collection.findOne({ where: { id: collectionId } }).then((collection) => {
    if (!collection) {
      return res.json({ message: "Такой коллекции не существует" });
    }

    next();
  });
};

const verifyId = (req, res, next) => {
  const { id } = req.params;
  Task.findOne({ where: { id: id } }).then((task) => {
    if (!task) {
      return res.status(400).json({ message: "Поле id отсутствует" });
    }

    next();
  });
};

module.exports = {
  verifyCollectionId,
  verifyPost,
  verifyId,
};
