import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException, RequestTimeoutException, BadRequestException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './Entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from 'src/profile/profile.entity';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { PaginationDto } from 'src/common/pagination/pagination-query.dto';
import { HashingProvider } from 'src/auth/provider/hashing.provider';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,

        private readonly paginationProvider: PaginationProvider,

        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider
    ){}
    async getAllUsers(pagination: PaginationDto){
        try{
            return await this.paginationProvider.paginateQuery(pagination, this.userRepository);
        } catch (error) {
            throw new RequestTimeoutException('An error occurred while fetching users');
        }
        
    }

    async findUserEmail(email: string) {
        return await this.userRepository.findOneBy({ email });
    }

    async findUserByUsername(username: string) {
        let user: User | null = null
        try{
           user =  await this.userRepository.findOneBy({username})
        }catch{
            throw new NotFoundException('User not found');
        }
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

    public async createUser(userDto : CreateUserDto){
        const email = await this.findUserEmail(userDto.email);
        if (email) {
            throw new BadRequestException('Email already exists');
        }
        const username = await this.findUserByUsername(userDto.username);
        if (username) {
            throw new BadRequestException('Username already exists');
        }
        userDto.profile = userDto.profile ?? {};
        let user = this.userRepository.create({
            ...userDto,
            password: await this.hashingProvider.hashPassword(userDto.password)
        });
        return await this.userRepository.save(user);
    }

    public async deleteUser(id: number){
        await this.userRepository.delete(id);
        return { message: 'User deleted successfully' };
    }

    public async findOne(id:number){
        if (!id) {
            throw new UnauthorizedException('User ID is required');
        }
        return await this.userRepository.findOneBy({ id });
    }

}
