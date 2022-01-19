const Router = require("express");
const router = new Router();
const authMiddleware = require("./../middlewares/authMiddleware");
const controller = require("./../controllers/authController");

router.post("/signup", authMiddleware.checkNotExistsUser, controller.signUp);
router.post(
  "/signin",
  [authMiddleware.checkExistsUser, authMiddleware.verifyPassword],
  controller.signIn
);

module.exports = router;
