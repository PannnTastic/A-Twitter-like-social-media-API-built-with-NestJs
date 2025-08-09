import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { In, Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { PaginationDto } from 'src/common/pagination/pagination-query.dto';

@Injectable()
export class HashtagService {
    constructor(
        @InjectRepository(Hashtag)
        private hashtagRepository: Repository<Hashtag>,
        private readonly paginationProvider: PaginationProvider
    ){}

    public async createHashtag(createHashtagDto: CreateHashtagDto){
        const hashtag = this.hashtagRepository.create(createHashtagDto);
        return await this.hashtagRepository.save(hashtag);
    }

    public async findHashtag(id?: number[]){
        return await this.hashtagRepository.find({
            where: {id: In(id ?? []) }
        })
    }

    public async allHashtags(pagination: PaginationDto){
        return await this.paginationProvider.paginateQuery(
            pagination,
            this.hashtagRepository
        )
    }

    public async deleteHashtag(id: number){
        await this.hashtagRepository.delete(id);
        return { deleted: true , id };
    }

    public async softdeleteHashtag(id: number){
        await this.hashtagRepository.softDelete(id);
        return { deleted: true , id };
    }
}
