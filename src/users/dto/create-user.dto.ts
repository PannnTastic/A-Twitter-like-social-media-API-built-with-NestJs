import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProfileDto } from "../../profile/dto/create-profile.dto"

export class CreateUserDto {
  
  @ApiProperty({
    description: 'Username for the user',
    example: 'johndoe',
    minLength: 3
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'securePassword123',
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiPropertyOptional({
    description: 'Optional profile data for the user',
    type: CreateProfileDto
  })
  @IsOptional()
  profile: CreateProfileDto ;

}