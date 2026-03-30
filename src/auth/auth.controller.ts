import { Body, Controller, Post } from '@nestjs/common';
import { CreateUSerDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUSerDto): Promise<void> {
    return this.authService.createUser(createUserDto);
  }

  @Post('/signin')
  signin(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
