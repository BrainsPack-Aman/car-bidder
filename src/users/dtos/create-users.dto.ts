import {IsEmail , IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
     
    @ApiProperty({ description: 'Email address for the new account.', example: 'driver@example.com' })
    @IsEmail()
    email : string ;

    @ApiProperty({ description: 'Password for the new account.', example: 'SecurePass123!' })
    @IsString()
    password : string;
}