import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Public } from 'src/utils/guards/public.guard';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in';
import { GenerateTokens } from './interfaces/generate-tokens.interface';
import { SignIn } from './interfaces/sign-in.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  create(@Body() signInDto: SignInDto):Promise<SignIn>{
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto): Promise<GenerateTokens> {
    const { refreshToken } = refreshTokenDto;
    return this.authService.generateTokens(refreshToken);
  }
}
