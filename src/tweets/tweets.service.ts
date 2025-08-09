import { Injectable, NotFoundException, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweets } from './tweets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetsDto } from './dto/create-tweets.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationDto } from 'src/common/pagination/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { ActiveUserType } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class TweetsService {
    constructor(
        private readonly userService: UsersService,
        private readonly hashtagService: HashtagService,
        @InjectRepository(Tweets)
        private readonly tweetsRepository: Repository<Tweets>,
        private readonly paginationProvider: PaginationProvider
    ) {}

    async getAllTweets(pagination: PaginationDto) {
        try{
            return await this.paginationProvider.paginateQuery(
                pagination,
                this.tweetsRepository
            );
        } catch (error) {
            throw new RequestTimeoutException('An error occurred while fetching tweets');
        }
    }

    public async getUserTweets(userId:number , pagination: PaginationDto){
        try{
            let user = await this.userService.findOne(userId);
            if (!user) {
                throw new NotFoundException('User not found');
            }
            try{
                return await this.paginationProvider.paginateQuery(
                    pagination,
                    this.tweetsRepository,
                    {user : {id: userId}},
                    ['user', 'hashtag']
                );
            } catch (error) {
                throw new RequestTimeoutException('An error occurred while fetching user tweets');
            }
        } catch (error) {
            throw new RequestTimeoutException('An error occurred while fetching user tweets');
        }

    }

    public async getTweetById(id: number){
        const tweet = await this.tweetsRepository.findOneBy({ id });
        if (!tweet) {
            throw new NotFoundException('Tweet tidak ditemukan');
        }
        
        return await this.tweetsRepository.findOne({
            where: {id},
            relations: ['user', 'hashtag']
        })
    }

    public async createTweet(createTweetDto: CreateTweetsDto, activeUser: ActiveUserType){
        
        let user = await this.userService.findOne(activeUser.sub);
        let hashtags = await this.hashtagService.findHashtag(createTweetDto.hashtag)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if(hashtags.length !== hashtags.length){
            throw new NotFoundException('Hashtags not found');
        }
        const tweet = this.tweetsRepository.create({
            ...createTweetDto,
            user,
            hashtag: hashtags
        });

        try {
            return await this.tweetsRepository.save(tweet);
        } catch (error) {
            throw new RequestTimeoutException('An error occurred while creating the tweet');
        }
    }

    async deleteTweet(id:number , activeuser: ActiveUserType){
        const user = await this.userService.findOne(activeuser.sub)
        if(!user){
            throw new NotFoundException
        }
       const tweet = await this.tweetsRepository.findOne({ where: { id } });
       if (!tweet) {
           throw new NotFoundException('Tweet not found');
       }

       if(user.id !== tweet.user.id){
        throw new UnauthorizedException('you are not Authorized to access this tweets')
       }
       try {
           await this.tweetsRepository.delete(id);
       } catch (error) {
           throw new RequestTimeoutException('An error occurred while deleting the tweet');
       }
    }

    async updateTweet(id: number, updateTweet: UpdateTweetDto, ActiveUser: ActiveUserType){
        const user = await this.userService.findOne(ActiveUser.sub)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const tweet = await this.tweetsRepository.findOne({
            where: {id},
            relations: ['user', 'hashtag']
        });
        if (!tweet) {
            throw new NotFoundException('Tweet not found');
        }
        if(user.id !== tweet.user.id){
            throw new UnauthorizedException('You are not authorized to update this tweet');
        }
        const hashtag = await this.hashtagService.findHashtag(updateTweet.hashtag);

        tweet.text = updateTweet.text ?? tweet.text;
        tweet.image = updateTweet.image ?? tweet.image;
        tweet.hashtag = hashtag;

       try{
           return await this.tweetsRepository.save(tweet);
       } catch (error) {
           throw new RequestTimeoutException('An error occurred while updating the tweet');
       }
    }
}
