import { Body ,Controller, Post , Get , Param ,ParseIntPipe, Query, Patch, Delete  , Session , UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { UsersService } from './users.service.js';
import { User } from './users.entity.js';
import { UpdateUserDto } from './dtos/update-users.dto.js';
import { Serialize } from '../interceptors/serialize.interceptor.js';
import { UserDto } from './dtos/user.dto.js';
import { AuthService } from './auth.service.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { AuthGuard } from '../gaurds/auth.guards.js';


@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(private usersService : UsersService , 
                private authService : AuthService
    ){}

    // @Get("/whoAmI")
    // async whoAmI(@Session() session : any){
     
    //   return await this.usersService.findOne(session.userId);
    // }

    @UseGuards(AuthGuard)
    @Get("/whoAmI")
    async whoAmI(@CurrentUser() user : User){
     
      return user;
    }

    @Post("/signout")
    async signout(@Session() session : any){
      session.userId= null;
      return;
    }

    @Post('/signup')
    async createUser(@Body() body : CreateUserDto , @Session() session :any){
     const user = await this.authService.signup(body.email , body.password);
     session.userId = user.id;
     return user;
    }

    @Post('/signin')
    async signin(@Body() body : CreateUserDto  , @Session() session :any){
    const user = await this.authService.signin(body.email,body.password);
    session.userId = user.id;
    return user;
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
