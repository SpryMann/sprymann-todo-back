const Router = require("express");
const router = new Router();
const collectionsRouter = require("./collectionsRouter");
const tasksRouter = require("./tasksRouter");
const authRouter = require("./authRouter");

router.use("/collections", collectionsRouter);
router.use("/tasks", tasksRouter);
router.use("/auth", authRouter);

module.exports = router;
