import express from "express";
import {
  getAllUsers,
  getAllTransactions,
  getSystemStats,
} from "../modules/admin/admin.controller";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/transactions", getAllTransactions);
router.get("/stats", getSystemStats);

export const adminRoute = router;
