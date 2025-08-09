import { PartialType } from "@nestjs/mapped-types";
import { CreateTweetsDto } from "./create-tweets.dto";
import {  IsInt, IsNotEmpty, IsNumber } from "class-validator";


export class UpdateTweetDto extends PartialType(CreateTweetsDto){}