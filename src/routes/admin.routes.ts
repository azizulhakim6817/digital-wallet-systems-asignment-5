import express from "express";
import {
  getAllUsers,
  getAllTransactions,
  getSystemStats,
} from "../modules/admin/admin.controller";
import { authGuard } from "../middlewares/auth.middleware";
import { restrictTo } from "../middlewares/role.middleware";
import { Roles } from "../constants/roles";

const router = express.Router();

// Middleware: Authentication & Admin Authorization
router.use(authGuard);
router.use(restrictTo(Roles.ADMIN));

// Admin Routes
router.get("/users", getAllUsers);
router.get("/transactions", getAllTransactions);
router.get("/stats", getSystemStats);

export const adminRoute = router;
