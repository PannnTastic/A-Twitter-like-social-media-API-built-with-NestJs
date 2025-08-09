import { Body, Controller, Delete, Get, Optional, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { TweetsService } from './tweets.service';
import { CreateTweetsDto } from './dto/create-tweets.dto';
import { IsOptional } from 'class-validator';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationDto } from 'src/common/pagination/pagination-query.dto';
import { AuthorizeGuard } from 'src/auth/guards/authorize.guard';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';

@ApiTags('Tweets')
@ApiBearerAuth('JWT-auth')
@Controller('tweets')
// @UseGuards(AuthorizeGuard)
export class TweetsController {
    constructor(private tweetService: TweetsService)
    {}

    @Get()
    @ApiOperation({ summary: 'Get all tweets with pagination' })
    @ApiResponse({ status: 200, description: 'Tweets retrieved successfully' })
    public getAllTweets(@Query() pagination: PaginationDto) {
        console.log(pagination);
        return this.tweetService.getAllTweets(pagination);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get tweets by user ID' })
    @ApiParam({ name: 'userId', description: 'User ID', type: 'number' })
    @ApiResponse({ status: 200, description: 'User tweets retrieved successfully' })
    public getUserTweets(@Query() pagination: PaginationDto,@Param('userId', ParseIntPipe) userId: number) {
        return this.tweetService.getUserTweets(userId, pagination);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get tweet by ID' })
    @ApiParam({ name: 'id', description: 'Tweet ID', type: 'number' })
    @ApiResponse({ status: 200, description: 'Tweet retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Tweet not found' })
    public getTweetById(@Param('id', ParseIntPipe) id: number){
        return this.tweetService.getTweetById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new tweet' })
    @ApiResponse({ status: 201, description: 'Tweet created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    public createTweet(@Body() tweet: CreateTweetsDto,@ActiveUser()user){

        return this.tweetService.createTweet(tweet,user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a tweet' })
    @ApiParam({ name: 'id', description: 'Tweet ID', type: 'number' })
    @ApiResponse({ status: 200, description: 'Tweet deleted successfully' })
    @ApiResponse({ status: 404, description: 'Tweet not found' })
    @ApiResponse({ status: 403, description: 'Forbidden - Not tweet owner' })
    public deleteTweet(@Param('id', ParseIntPipe)id: number, @ActiveUser() user){
        return this.tweetService.deleteTweet(id,user);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a tweet' })
    @ApiParam({ name: 'id', description: 'Tweet ID', type: 'number' })
    @ApiResponse({ status: 200, description: 'Tweet updated successfully' })
    @ApiResponse({ status: 404, description: 'Tweet not found' })
    @ApiResponse({ status: 403, description: 'Forbidden - Not tweet owner' })
    public updateTweet(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTweet: UpdateTweetDto,
        @ActiveUser() user
    ){
        return this.tweetService.updateTweet(id, updateTweet,user);
    }

}
