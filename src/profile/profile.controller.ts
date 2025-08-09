import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { UpdateProfileDto } from './dto/edit-profile.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get()
    getAll() {
        return this.profileService.getAllProfiles()
    }

    @Get(':id')
    async getProfile(@Param('id', ParseIntPipe) id: number, @ActiveUser() activeuser) {
        return await this.profileService.getProfile(id, activeuser)
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @ActiveUser() user, 
        @Body() 
        profile: UpdateProfileDto, 
        userdto: UpdateUserDto
    ) {
        return await this.update(id, profile, user, userdto)
    }
}
