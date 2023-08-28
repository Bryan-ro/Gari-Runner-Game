import { Request, Response, Router } from "express";
import { Validations } from "../dto/validatiosConfig";
import { CreatePlayerAndHighScoreDto } from "../dto/userAndHighScore/CratePlayerAndHighScoreDto";
import { UpdateScoreDto } from "../dto/userAndHighScore/UpdateScore";
import { UserAndHighScoreService } from "../services/UserAndHighScoreService";

const service = new UserAndHighScoreService();
const router = Router();
const validations = new Validations();

export class UserAndHighScoreController {
    public routes() {
        router.post("/create", this.createUser);
        router.patch("/update", this.updateScore);

        return router;
    }


    private async createUser(req: Request, res: Response) {
        const user: CreatePlayerAndHighScoreDto = req.body;
        const errors = await validations.validate(CreatePlayerAndHighScoreDto, user);
        
        if(errors.errors.length > 0) {
            return res.status(400).json({ ...errors });
        } 

        const creation = await service.createUserAndHighScore(user);

        return res.status(creation.statusCode).json({ ...creation });
    }

    private async updateScore (req: Request, res: Response) {
        const newScore: UpdateScoreDto = req.body;
        const validate = await validations.validate(UpdateScoreDto, newScore);

        if(validate.errors.length > 0) return res.status(validate.statusCode).json({ ...validate });

        const update = await service.updateScore(newScore.id, newScore.highScore, newScore.playerName);

        return res.status(update.statusCode).json({ ...update });

    }
}