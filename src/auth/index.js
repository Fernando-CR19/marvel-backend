import express from "express";
import * as controller from "./auth.controller"

const router = express.Router()

router.post('/local/signin', controller.signInWithEmail);
router.post('/local/signup', controller.signUpWithEmail)

export default router