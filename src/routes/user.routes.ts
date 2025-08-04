import express from "express";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../modules/user/user.controller";

const router = express.Router();

router.get("/getUser", getAllUsers);
router.get("/:id", getSingleUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;

export const userhRoute = router;
