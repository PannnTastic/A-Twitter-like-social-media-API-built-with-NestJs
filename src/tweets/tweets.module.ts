import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweets } from './tweets.entity';
import { UsersModule } from 'src/users/users.module';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/auth/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TweetsController],
  providers: [TweetsService],
  imports: [
    TypeOrmModule.forFeature([Tweets]), 
    UsersModule,
    HashtagModule,
    PaginationModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider())
  ]
})
export class TweetsModule {}
