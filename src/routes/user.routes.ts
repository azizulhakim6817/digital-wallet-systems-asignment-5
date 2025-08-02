import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../modules/user/user.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export const userhRoute = router;
