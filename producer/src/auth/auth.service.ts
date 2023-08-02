import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInDto } from './dto/sign-in';
import { User } from './schema/auth.schema';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SignIn } from 'src/auth/interfaces/sign-in.interface';
import { GenerateRefreshToken } from './interfaces/generate-refresh-token.interface';
import { GenerateTokens } from './interfaces/generate-tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) { }

  async signIn(signInDto: SignInDto): Promise<SignIn> {
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({ email })  
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid === false) {
      throw new UnauthorizedException();
    }
    const refresh_token = await this.generateRefreshToken({ sub: user.id, username: user.email });
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: refresh_token.refresh_token
    };
  }

  async generateRefreshToken(payload: any): Promise<GenerateRefreshToken> {
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' })
    await this.cacheManager.set(`${refreshToken}`, refreshToken, 604800);
    return { refresh_token: refreshToken };
  }

  async generateTokens(refresh_token: string): Promise<GenerateTokens> {
    const refreshTokenCache = await this.cacheManager.get(`${refresh_token}`);
    if (!refreshTokenCache) {
      throw new UnauthorizedException();
    }
    await this.cacheManager.del(`${refresh_token}`);
    const payload = await this.jwtService.verifyAsync(refresh_token);
    const newRefreshToken = await this.generateRefreshToken({ sub: payload.sub, username: payload.username });
    const access_token = await this.jwtService.signAsync({ sub: payload.sub, username: payload.username })

    return { access_token, refresh_token: newRefreshToken.refresh_token };
  }
}
