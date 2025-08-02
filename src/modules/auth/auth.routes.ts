import express from "express";
import { register, login, refreshToken, logout } from "./auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;
