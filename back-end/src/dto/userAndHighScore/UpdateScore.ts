import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateScoreDto {
    @IsNotEmpty()
    @IsInt()
        id!: number;

    @IsOptional()
    @IsInt()
        highScore?: number;
    
    @IsOptional()
    @IsString()
        playerName?: string;
}