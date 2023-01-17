import express from "express";
import * as controller from "./auth.controller"
import { authorization } from "./auth.middlewares";
import multer from "multer";

const router = express.Router()

const upload = multer()

router.post('/local/signin', controller.signInWithEmail);
router.post('/local/signup', controller.signUpWithEmail);
router.patch('/change-password', authorization, upload.none(), controller.changePassword)

export default router