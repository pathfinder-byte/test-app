import { Router } from "express";
import {
  getUsers,
  register,
  login,
  profile,
  logout,
  checkAuth,
} from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authenticate";

const router = Router();
router.get("/users", authenticateToken, getUsers);
router.get("/profile", authenticateToken, profile);

router.post("/register", register);
router.get("/check-auth", checkAuth);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);

export default router;
