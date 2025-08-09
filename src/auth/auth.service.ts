import {
    Injectable,
    UnauthorizedException,
    Inject,
    forwardRef,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './auth.config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/Entity/user.entity';
import { ActiveUserType } from './interfaces/active-user.interface';
import { refreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,

        private readonly hashingProvider: HashingProvider,

        private readonly jwtService: JwtService,
    ) { }

    isAuthenticated: boolean = false;
    public async login(login: loginDto) {
        const user = await this.usersService.findUserByUsername(login.username);
        if (!user) {
            throw new UnauthorizedException('Username salah!');
        }
        let password: boolean = false;
        password = await this.hashingProvider.comparePassword(
            login.password,
            user.password,
        );
        if (!password) {
            throw new UnauthorizedException('Password salah!');
        }
        const token = await this.generateToken(user);
        return { token: token };
    }

    async signup(signup: CreateUserDto) {
        return await this.usersService.createUser(signup);
    }

    private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                secret: this.authConfiguration.secret,
                expiresIn: expiresIn,
                audience: this.authConfiguration.audience,
                issuer: this.authConfiguration.issuer,
            },
        );
    }

    private async generateToken(user: User) {
        const accessToken = await this.signToken<Partial<ActiveUserType>>(
            user.id,
            this.authConfiguration.expiresIn,
            {
                email: user.email,
            },
        );

        const refreshToken = await this.signToken(
            user.id,
            this.authConfiguration.refreshTokenExpiresIn,
        );
        return {
            token: accessToken,
            refreshToken,
        };
    }

    public async refreshToken(refreshTokenDto: refreshTokenDto) {
        try {
            const { sub } = await this.jwtService.verifyAsync(
                refreshTokenDto.refreshToken,
                {
                    secret: this.authConfiguration.secret,
                    audience: this.authConfiguration.audience,
                    issuer: this.authConfiguration.issuer,
                },
            );

            const user = await this.usersService.findOne(sub);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            const newToken = await this.generateToken(user);

            return newToken;
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
