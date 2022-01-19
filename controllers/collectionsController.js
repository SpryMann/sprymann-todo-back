const db = require("./../models");
const Collection = db.collections;
const TasksController = require("./tasksController");

class CollectionsController {
  async getAll(req, res) {
    const { userId } = req;
    const collections = await Collection.findAll({ where: { userId } });
    return res.json(collections);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const collection = await Collection.findOne({ where: { id } });
    return res.json(collection);
  }

  async create(req, res) {
    const { userId } = req;
    const { title, icon, color } = req.body;
    const collection = await Collection.create({ title, icon, color, userId });
    return res.json(collection);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, icon, color } = req.body;
    await Collection.update({ title, icon, color }, { where: { id } });
    const collection = await Collection.findOne({ where: { id } });
    return res.json(collection);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Collection.destroy({ where: { id } });
    await TasksController.removeAbandoned();
    return res.json({ message: "Удалено" });
  }
}

module.exports = new CollectionsController();
