import { Injectable , Inject} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import { Request } from 'express';
import { PaginationDto } from './pagination-query.dto';
import { FindManyOptions, FindOptionsRelations, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { Paginator } from './paginator.interface';

@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST)
        private readonly request: Request
    ){}

    public async paginateQuery <T extends ObjectLiteral>(
        paginateQuery: PaginationDto,
        repository: Repository<T>,
        where?: FindOptionsWhere<T>,
        relations?: string[]

    ): Promise<Paginator<T>>{
        const findOptions: FindManyOptions <T> = {
            skip: (paginateQuery.page - 1) * paginateQuery.limit,
            take: paginateQuery.limit
        }
        if (where) {
            findOptions.where = where
        }
        if (relations) {
            findOptions.relations = relations;
        }
        const result =  await repository.find(findOptions)

        const totalItems = await repository.count()
        const totalPages = Math.ceil(totalItems / paginateQuery.limit)

        const currentPage = paginateQuery.page;
        const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
        const previousPage = currentPage === 1 ? currentPage : currentPage - 1;

        const baseUrl = this.request.protocol + '://' + this.request.headers.host + '/';
        const newUrl = new URL(this.request.url, baseUrl)

        const response :Paginator<T> = {
            data : result,
            meta : {
                itemsPerPage: paginateQuery.limit,
                totalItems: totalItems,
                currentPage: paginateQuery.page,
                totalPages: totalPages
            },
            links: {
                first: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=1`,
                last: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${totalPages}`,
                current: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${currentPage}`,
                next:  `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${nextPage}`,
                previous:  `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${previousPage}`
            }
        }

        return response;
    }
}
