import { Router } from "express";
import {
  welcome,
  posts,
  postDetail,
  content,
  searchTag,
} from "../controllers/home.controller";
import { authenticateToken } from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticateToken, welcome);
router.get("/posts", authenticateToken, posts);
router.get("/posts/:id", authenticateToken, postDetail);
router.get("/posts/:id/content", authenticateToken, content);
router.get("/posts/tag/:tag", authenticateToken, searchTag);

export default router;
