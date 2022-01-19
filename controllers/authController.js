const db = require("./../models");
const User = db.user;
const Role = db.role;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async signUp(req, res) {
    try {
      const { username, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 7);
      await User.create({ username, password: hashedPassword, roleId: 1 });
      return res.status(200).json({
        message: "Пользователь создан",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Произошла ошибка на сервере",
      });
    }
  }

  async signIn(req, res) {
    try {
      const { username } = req.body;
      const user = await User.findOne({ where: { username } });
      const role = await Role.findOne({ where: { id: user.roleId } });
      const token = jwt.sign(
        { id: user.id, role: role.title },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      return res.status(200).json({
        message: "Пользователь авторизован",
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Произошла ошибка на сервере",
      });
    }
  }
}

module.exports = new AuthController();
