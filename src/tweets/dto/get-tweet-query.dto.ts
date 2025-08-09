import { IntersectionType } from "@nestjs/mapped-types";
import { IsDate, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/pagination/pagination-query.dto";

class GetTweetDto{
    @IsDate()
    @IsOptional()
    startdate?: Date;

    @IsDate()
    @IsOptional()
    enddate?: Date;
}

export class GetTweetQueryDto extends IntersectionType (GetTweetDto, PaginationDto) {}