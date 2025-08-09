import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './Entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { Tweets } from 'src/tweets/tweets.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  providers: [UsersService ,],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Profile,Tweets]),PaginationModule, forwardRef(() => AuthModule)],
})
export class UsersModule {}
