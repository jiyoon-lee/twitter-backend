// 데이터베이스를 써야한다면
import express from "express";
import "express-async-errors";

import * as AuthController from "../controller/auth.js";

const router = express.Router();

// POST /signin
router.post("/login", AuthController.login);

// POST /signup
router.post("/signup", AuthController.signup);

export default router;
