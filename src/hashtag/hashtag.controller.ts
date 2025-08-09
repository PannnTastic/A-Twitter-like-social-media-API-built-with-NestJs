import { Body, Controller, Delete, ParseIntPipe, Post , Param, Get, Query} from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { PaginationDto } from 'src/common/pagination/pagination-query.dto';

@Controller('hashtag')
export class HashtagController {
    constructor(private readonly hashtagService: HashtagService){}

    @Post()
    public createHashtag(@Body() hashtagDto: CreateHashtagDto){
        return this.hashtagService.createHashtag(hashtagDto);
    }

    @Delete(':id')
    public deleteHashtag(@Param('id', ParseIntPipe) id: number){
        return this.hashtagService.deleteHashtag(id);
    }

    @Get(':id')
    public getHashtag(@Param('id', ParseIntPipe) id: number){
        return this.hashtagService.findHashtag([id]);
    }

    @Get()
    public getAllHashtags(@Query() pagination: PaginationDto){
        return this.hashtagService.allHashtags(pagination);
    }
}
