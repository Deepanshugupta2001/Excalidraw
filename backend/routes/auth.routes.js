import express from "express";
const router = express.Router();
import { signup, login, logout, me } from "../controllers/auth.controllers.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", me);


export default router;
