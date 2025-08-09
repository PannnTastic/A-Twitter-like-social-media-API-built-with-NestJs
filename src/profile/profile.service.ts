import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ActiveUserType } from 'src/auth/interfaces/active-user.interface';
import { UsersService } from 'src/users/users.service';
import { UpdateProfileDto } from './dto/edit-profile.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        private readonly userService: UsersService,
    ) { }

    getAllProfiles() {
        return this.profileRepository.find({
            relations: {
                user: true,
            },
        });
    }

    async getProfile(id: number, activeUser: ActiveUserType) {
        const user = await this.userService.findOne(activeUser.sub);
        if (!user) {
            throw new NotFoundException();
        }
        const profile = await this.profileRepository.findOneBy({ id });
        if (!profile) {
            throw new NotFoundException();
        }
        if (user.id !== profile.user.id) {
            throw new UnauthorizedException();
        }
    }

    async findOne(id: number) {
        return await this.profileRepository.findOneBy({ id });
    }

    async update(
        id: number,
        activeUser: ActiveUserType,
        updatedto: UpdateProfileDto,
        updateUser: UpdateUserDto,
    ) {
        const user = await this.userService.findOne(activeUser.sub);
        if (!user) {
            throw new NotFoundException();
        }
        const profile = await this.profileRepository.findOneBy({ id });
        if (!profile) {
            throw new NotFoundException();
        }
        if (user.id !== profile.user.id) {
            throw new UnauthorizedException();
        }

        try {
            return await this.profileRepository.save({
                ...updatedto,
                ...updateUser,
            });
        } catch (error) { 
            throw new BadRequestException
        }
    }
}
