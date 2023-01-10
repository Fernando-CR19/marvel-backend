import express from "express"
import * as controller from "./user.controlle"
import { authorization } from "../../auth/auth.middlewares"

const router = express.Router();

router.post("/me/avatar", authorization, controller.avatar);

export default router