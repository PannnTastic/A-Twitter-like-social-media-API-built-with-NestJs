import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { AllowPublic } from './decorators/public.decorator';
import { refreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Authentication')
@Controller('auth')
@AllowPublic()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiBadRequestResponse({ description: 'Invalid credentials' })
    login(@Body() login: loginDto) {
        return this.authService.login(login);
    }

    @Post('signup')
    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    async signup(@Body()signup: CreateUserDto){
        return await this.authService.signup(signup)
    }

    @Post('refresh-token')
    @HttpCode(200)
    @ApiOperation({ summary: 'Refresh JWT token' })
    @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
    @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
    public async refreshToken(@Body() refreshTokenDto: refreshTokenDto){
        return await this.authService.refreshToken(refreshTokenDto);    
    }

}
