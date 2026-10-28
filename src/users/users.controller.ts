import { Body ,Controller, Post , Get , Param ,ParseIntPipe, Query, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { UsersService } from './users.service.js';
import { User } from './users.entity.js';
import { UpdateUserDto } from './dtos/update-users.dto.js';

@Controller('auth')
export class UsersController {

    constructor(private usersService : UsersService ){}

    @Post('/signup')
    createUser(@Body() body : CreateUserDto){
      this.usersService.create(body.email , body.password)
    }

    @Get("/:id")
    findOne(@Param("id" , ParseIntPipe) id : number){
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
