import { Router } from "express";
import { UserAndHighScoreController } from "../controllers/UserAndHighScoreController";

const router = Router();

const userAndHighScore = new UserAndHighScoreController();

router.use("/score", userAndHighScore.routes());

export { router };