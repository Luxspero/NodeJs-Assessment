import expreess from "express";
import { login, register } from "../Controllers/contLogin.js";
import { Question, QuestionPost } from "../Controllers/contQuestion.js";

const router = expreess.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/questions", Question);
router.post("/questions", QuestionPost);

export default router;
