import { Body ,Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { UsersService } from './users.service.js';

@Controller('auth')
export class UsersController {

    constructor(private usersService : UsersService ){}

    @Post('/signup')
    createUser(@Body() body : CreateUserDto){
      this.usersService.create(body.email , body.password)
    }
}
