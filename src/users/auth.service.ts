import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { randomBytes , scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { buffer } from "stream/consumers";

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
}