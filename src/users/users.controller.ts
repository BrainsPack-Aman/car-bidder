import { Body ,Controller, Post , Get , Param ,ParseIntPipe, Query, Patch, Delete, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { UsersService } from './users.service.js';
import { User } from './users.entity.js';
import { UpdateUserDto } from './dtos/update-users.dto.js';
import { Serialize } from '../interceptors/serialize.interceptor.js';
import { UserDto } from './dtos/user.dto.js';
import { AuthService } from './auth.service.js';


@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(private usersService : UsersService , 
                private authService : AuthService
    ){}

    @Post('/signup')
    createUser(@Body() body : CreateUserDto){
      this.authService.signup(body.email , body.password)
    }

    @Post('/signin')
    signin(@Body() body : CreateUserDto){
      return this.authService.signin(body.email,body.password);
    }

    // @UseInterceptors( new SerializeInterceptor(UserDto))
    // @Serialize(UserDto)
    @Get("/:id")
    findOne(@Param("id" , ParseIntPipe) id : number){
        console.log("handler is running")
        return this.usersService.findOne( id);
    }

    @Get("/")
    find(@Query("email") email : string){
      return this.usersService.find(email);
    }

    @Patch("/:id")
    update(@Param('id',ParseIntPipe) id : number , @Body() body : UpdateUserDto){
        return this.usersService.update(id ,body);
    }

    @Delete("/:id")
    remove(@Param('id', ParseIntPipe) id : number){
        
      return this.usersService.remove(id);
    }

   

    
}
