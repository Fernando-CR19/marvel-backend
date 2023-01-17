import express from "express"
import * as controller from "./user.controlle"
import { authorization } from "../../auth/auth.middlewares"
import multer from "multer";

const update = multer()

const router = express.Router();

router.post("/me/avatar", authorization, controller.avatar);
router.put("/me", authorization, update.none(), controller.update)

export default router