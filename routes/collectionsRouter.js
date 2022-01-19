const Router = require("express");
const router = new Router();
const middleware = require("./../middlewares/collectionMiddleware");
const authMiddleware = require("./../middlewares/authMiddleware");
const controller = require("./../controllers/collectionsController");

router.get(
  "/",
  [authMiddleware.verifyToken, authMiddleware.checkExistsUserById],
  controller.getAll
);
router.get(
  "/:id",
  [
    authMiddleware.verifyToken,
    authMiddleware.checkExistsUserById,
    middleware.verifyId,
    middleware.userHasAccessToCollection,
  ],
  controller.getOne
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
    middleware.userHasAccessToCollection,
  ],
  controller.update
);
router.delete(
  "/:id",
  [
    authMiddleware.verifyToken,
    authMiddleware.checkExistsUserById,
    middleware.verifyId,
    middleware.userHasAccessToCollection,
  ],
  controller.delete
);

module.exports = router;
