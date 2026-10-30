import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { randomBytes , scrypt as _scrypt } from "crypto";
import { promisify } from "util";
const scrypt = promisify(_scrypt);



@Injectable()
export class AuthService{
   constructor( private userService : UsersService){};
   
   async signup(email : string , password : string){
     
    // check if the email exists 

    const users = await this.userService.find(email);

    if(users.length) throw new BadRequestException("Email is already in Use");

    //hash the password 

    // generate a salt 
    const salt = randomBytes(8).toString("hex");

    // Hash the salt and the password together

    const hash =  (await scrypt(password , salt,32)) as Buffer;

    //join the hashresult and the salt together

    const result = salt + "." + hash.toString("hex");

    const user = this.userService.create(email,result);

    return user;
   }


   async signin(email : string , password : string){

    const user = await this.userService.findOneByEmail(email);

    if(!user){
        throw new NotFoundException("User Not found");
    }

    const salt = user.password.split(".")[0];

    const hash = (await scrypt(password,salt,32)) as Buffer;

    const result =salt + "." + hash.toString("hex");

    if(result != user.password){
       throw new UnauthorizedException("check your email or password")
    }

     return user;

   }
}