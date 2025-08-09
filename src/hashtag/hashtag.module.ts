import { Module } from '@nestjs/common';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
    controllers: [HashtagController],
    providers: [HashtagService],
    imports: [TypeOrmModule.forFeature([Hashtag]),PaginationModule],
    exports: [HashtagService] 
})
export class HashtagModule {}
