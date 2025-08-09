import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import { LoggingModule } from './common/logging/logging.module';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import  appConfig  from './config/app.config';
import databaseConfig from './config/database.config';
import  envValidator  from './config/env.validation';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizeGuard } from './auth/guards/authorize.guard';
import authConfig from './auth/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validationSchema: envValidator,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
      }),
    }),
    ProfileModule,
    HashtagModule,
    PaginationModule,
    LoggingModule,
    DatabaseModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider())
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: AuthorizeGuard
  }],
})
export class AppModule {}
