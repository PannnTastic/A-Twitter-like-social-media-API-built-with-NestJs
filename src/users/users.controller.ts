import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/pagination/pagination-query.dto';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Get()
    @ApiOperation({ summary: 'Get all users with pagination' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    findAll(@Query() pagination: PaginationDto){
        return this.usersService.getAllUsers(pagination);
    }

    // @Post()
    // createUser(@Body() userDto: CreateUserDto){
    //     this.usersService.createUser(userDto);
    // }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.deleteUser(id);
    }
}
