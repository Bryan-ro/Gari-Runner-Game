import { UserAndHighScore } from "../models/UserAndHighScore";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserAndHighScoreService { 
    public async createUserAndHighScore(userValues: UserAndHighScore) {
        try {
            await prisma.playerHighScore.create({
                data: {
                    playerName: userValues.playerName,
                    highScore: userValues.highScore
                }
            });

            return { message: "Pontuação gravada com sucesso.", statusCode: 201 };
        } catch (error) {
            if((error as Errors.prisma).code === "P1009") {
                return {message: "Esse nickname já está em uso, tente outro.", statusCode: 400 };
            } else {
                return { message: "Erro interno no servidor, se perssistir entre contato com o Bryan.", statusCode: 500 };
            }
            
           
        }
        
    }
}


