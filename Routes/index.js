import expreess from "express";
import { login, register } from "../Controllers/contLogin.js";
import Question from "../Controllers/contQuestion.js";

const router = expreess.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/questions", Question);

export default router;
