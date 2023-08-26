import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreatePlayerAndHighScoreDto } from "../dto/userAndHighScore/CratePlayerAndHighScoreDto";
// import { UserAndHighScoreService } from "../services/UserAndHighScoreService";

// const service = new UserAndHighScoreService();
const router = Router();

export class UserAndHighScoreController {
    public routes() {
        router.post("/create", this.createUser);
        return router;
    }


    private async createUser(req: Request, res: Response) {
        const user: CreatePlayerAndHighScoreDto = req.body;
        const dto = plainToClass(CreatePlayerAndHighScoreDto, user);

        const errors = await validate(dto);

        if(errors.length > 0) {
            res.status(400).json({ errors });
        } else {
            res.send("Passou");
        }
    }
}