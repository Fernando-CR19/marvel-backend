import express from "express";
import * as controller from "./auth.controller"

const router = express.Router()

router.post('/local/signin', controller.sinInVithEmail);
router.post('/local/signup', controller.signUpWithEmail)

export default router