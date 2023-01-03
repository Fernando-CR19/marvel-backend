import express from "express";
import * as controller from "./character.controller"

const router = express.Router()

router.get('/characters', controller.list);
router.patch('/characters', controller.update);

export default router