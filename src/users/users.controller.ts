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
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';



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
    @ApiOperation({ summary: 'Get the currently authenticated user.' })
    @Get("/whoAmI")
    async whoAmI(@CurrentUser() user : User){
     
      return user;
    }

    @ApiOperation({ summary: 'Sign out the current user.' })
    @Post("/signout")
    async signout(@Session() session : any){
      session.userId= null;
      return;
    }

    @ApiOperation({ summary: 'Create a user account and sign in.' })
    @Post('/signup')
    async createUser(@Body() body : CreateUserDto , @Session() session :any){
     const user = await this.authService.signup(body.email , body.password);
     session.userId = user.id;
     return user;
    }

    @ApiOperation({ summary: 'Sign in with email and password.' })
    @Post('/signin')
    async signin(@Body() body : CreateUserDto  , @Session() session :any){
    const user = await this.authService.signin(body.email,body.password);
    session.userId = user.id;
    return user;
    }

    // @UseInterceptors( new SerializeInterceptor(UserDto))
    // @Serialize(UserDto)
    @ApiOperation({ summary: 'Get a user by ID.' })
    @ApiParam({ name: 'id', description: 'ID of the user to retrieve.', example: 7 })
    @Get("/:id")
    findOne(@Param("id" , ParseIntPipe) id : number){
        console.log("handler is running")
        return this.usersService.findOne( id);
    }

    @ApiOperation({ summary: 'Find users, optionally filtered by email.' })
    @ApiQuery({ name: 'email', description: 'Email address to filter by.', example: 'driver@example.com', required: false })
    @Get("/")
    find(@Query("email") email : string){
      return this.usersService.find(email);
    }

    @ApiOperation({ summary: 'Update a user by ID.' })
    @ApiParam({ name: 'id', description: 'ID of the user to update.', example: 7 })
    @Patch("/:id")
    update(@Param('id',ParseIntPipe) id : number , @Body() body : UpdateUserDto){
        return this.usersService.update(id ,body);
    }

    @ApiOperation({ summary: 'Delete a user by ID.' })
    @ApiParam({ name: 'id', description: 'ID of the user to delete.', example: 7 })
    @Delete("/:id")
    remove(@Param('id', ParseIntPipe) id : number){
        
      return this.usersService.remove(id);
    }

   

    
}
