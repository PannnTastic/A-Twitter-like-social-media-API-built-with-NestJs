import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSeeder } from './database-seeder.service';
import { User } from '../users/Entity/user.entity';
import { Profile } from '../profile/profile.entity';
import { Tweets } from '../tweets/tweets.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Tweets, Hashtag]),
    AuthModule,
  ],
  providers: [DatabaseSeeder],
  exports: [DatabaseSeeder],
})
export class DatabaseModule {}
