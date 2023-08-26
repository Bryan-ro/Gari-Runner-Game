import { Request, Response, Router } from "express";
import { Validations } from "../dto/validatiosConfig";
import { CreatePlayerAndHighScoreDto } from "../dto/userAndHighScore/CratePlayerAndHighScoreDto";
import { UserAndHighScoreService } from "../services/UserAndHighScoreService";

const service = new UserAndHighScoreService();
const router = Router();
const validations = new Validations();

export class UserAndHighScoreController {
    public routes() {
        router.post("/create", this.createUser);
        return router;
    }


    private async createUser(req: Request, res: Response) {
        const user: CreatePlayerAndHighScoreDto = req.body;
        const errors = await validations.validate(CreatePlayerAndHighScoreDto, user);
        
        if(errors.length > 0) {
            return res.status(400).json({ errors });
        } 

        const creation = await service.createUserAndHighScore(user);

        return res.status(creation.statusCode).json({ ...creation });
    }
}