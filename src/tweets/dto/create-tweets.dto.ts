import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTweetsDto{
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsOptional()
    image?:string;

    @IsOptional()
    @IsInt({ each: true })
    @IsArray()
    hashtag?: number[];
}