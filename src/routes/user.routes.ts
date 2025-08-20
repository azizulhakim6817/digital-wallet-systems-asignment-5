import express from "express";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  changePassword,
} from "../modules/user/user.controller";

import { Roles } from "../constants/roles";
import { authorize } from "../middlewares/authorize";


const router = express.Router();

// Get all users - only ADMIN can do this
router.get(
  "/getUser",
  authorize([Roles.ADMIN]),
  getAllUsers
);

// Get single user - only ADMIN or the user itself
router.get(
  "/:id",
  authorize([Roles.USER, Roles.ADMIN]),
  getSingleUser
);

// Update user - only ADMIN or the user itself
router.patch(
  "/:id",
  authorize([Roles.USER, Roles.ADMIN]),
  updateUser
);

// Delete user - only ADMIN
router.delete(
  "/:id",
  authorize([Roles.ADMIN]),
  deleteUser
);

// Change password - for both USER and ADMIN
router.patch(
  "/change-password",
  authorize([Roles.USER, Roles.ADMIN]),
  changePassword
);

export const userRoutes = router;
