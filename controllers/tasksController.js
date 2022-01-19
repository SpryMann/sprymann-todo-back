const db = require("./../models");
const Task = db.tasks;

class TasksController {
  async getAll(req, res) {
    const { collectionId } = req.params;
    const tasks = await Task.findAll({ where: { collectionId } });
    return res.json(tasks);
  }

  async create(req, res) {
    const { title, color, collectionId } = req.body;
    const date = req.body?.date;
    if (date) {
      const task = await Task.create({ title, date, color, collectionId });
      return res.json(task);
    } else {
      const task = await Task.create({ title, color, collectionId });
      return res.json(task);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, status, date, color, collectionId } = req.body;
    await Task.update(
      { title, status, date, color, collectionId },
      { where: { id } }
    );
    const tasks = await Task.findAll({ where: { collectionId } });
    return res.json(tasks);
  }

  async removeAbandoned() {
    Task.findAll({ where: { collectionId: null } }).then((tasks) => {
      tasks.forEach((task) => {
        Task.destroy({ where: { id: task.id } });
      });
    });
  }
}

module.exports = new TasksController();
