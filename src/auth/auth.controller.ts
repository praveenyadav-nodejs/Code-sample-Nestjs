import { Body, Controller, Post } from '@nestjs/common';
import { CreateUSerDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUSerDto): Promise<void> {
    return this.authService.createUser(createUserDto);
  }

  @Post('/signin')
  signin(
    @Body() createUserDto: CreateUSerDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto);
  }
}
