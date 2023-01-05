import express from "express";
import * as controller from "./character.controller"

const router = express.Router()

router.get('/', controller.list);
router.patch("/:id/favorite", controller.favorite);
router.delete("/:id/unfavorite", controller.unfavorite)

export default router