import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreatePlayerAndHighScoreDto {
    @IsNotEmpty()
    @IsString()
        playerName!: string;

    @IsNotEmpty()
    @IsNumber()
        highScore!: number;
}