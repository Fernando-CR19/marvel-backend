import express from "express";
import { authorization } from "../../auth/auth.middlewares";
import * as controller from "./character.controller"

const router = express.Router()

router.get('/', controller.list);
router.patch("/:id/favorite", authorization, controller.favorite);
router.delete("/:id/unfavorite", authorization, controller.unfavorite)

export default router