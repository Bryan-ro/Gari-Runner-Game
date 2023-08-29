import { UserAndHighScore } from "../models/UserAndHighScore";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserAndHighScoreService { 
    public async getTopTenPlayers() {
        try {
            const highScores = await prisma.playerHighScore.findMany({
                orderBy: {
                    highScore: "desc"
                },
                take: 10,
                select: {
                    playerName: true,
                    highScore: true,
                    id: false
                }
            });
    
            return { ...highScores, statusCode: 200 };
        } catch (error) {
            return { message: "Erro interno do servidor.", statusCode: 500 };
        }
    }


    public async createUserAndHighScore(userValues: UserAndHighScore) {
        try {
            const data = await prisma.playerHighScore.create({
                data: {
                    playerName: userValues.playerName,
                    highScore: userValues.highScore
                }
            });

            return { message: "Pontuação gravada com sucesso.", data: data, statusCode: 201 };
        } catch (error) {
            if((error as Errors.prisma).code === "P2002") return {message: "Esse nickname já está em uso, tente outro.", statusCode: 400 };
            
            else return { message: "Erro interno no servidor, se perssistir entre contato com o Bryan.", statusCode: 500 };
        }
    }

    public async updateScore (id: number, highScore?: number, playerName?: string) {
        try {   
            const currentHighScore = await this.getHighScoreForUpdate(id);
            if(currentHighScore) {
                await prisma.playerHighScore.update({
                    where: {
                        id: id
                    },
                    
                    data: {
                        highScore: Number(highScore) > currentHighScore.highScore? highScore: currentHighScore.highScore, 
                        playerName: playerName ?? currentHighScore.playerName 
                    }
                });

                return { message: "Pontuação atualizada com sucesso.", statusCode: 200 };
            }

            return { message: "O jogador não existe.", statusCode: 400 };
            
        } catch (error) {
            return { message: "Erro interno do servidor.", statusCode: 500};
        }
    }
    
    private async getHighScoreForUpdate (id: number) {
        return await prisma.playerHighScore.findUnique({ where: { id } });
    }
}


