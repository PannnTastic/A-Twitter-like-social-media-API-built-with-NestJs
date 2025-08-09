import { Injectable } from "@nestjs/common";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsOptional()
    @IsDate()
    dateOfBirth?: Date;

    @IsString() 
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    profileImage?: string;
}