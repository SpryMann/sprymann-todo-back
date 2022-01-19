const Router = require("express");
const router = new Router();
const middleware = require("./../middlewares/taskMiddleware");
const authMiddleware = require("./../middlewares/authMiddleware");
const controller = require("./../controllers/tasksController");

router.get(
  "/:collectionId",
  [
    authMiddleware.verifyToken,
    authMiddleware.checkExistsUserById,
    middleware.verifyCollectionId,
  ],
  controller.getAll
);
router.post(
  "/",
  [
    authMiddleware.verifyToken,
    authMiddleware.checkExistsUserById,
    middleware.verifyPost,
  ],
  controller.create
);
router.put(
  "/:id",
  [
    authMiddleware.verifyToken,
    authMiddleware.checkExistsUserById,
    middleware.verifyId,
  ],
  controller.update
);

module.exports = router;
