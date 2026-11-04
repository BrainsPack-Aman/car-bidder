import { IsEmail , IsString , IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateUserDto{
    @ApiProperty({ description: 'Updated email address. Omit to keep the current email.', example: 'driver@example.com', required: false })
    @IsEmail()
    @IsOptional()
    email : string;

    @ApiProperty({ description: 'Updated password. Omit to keep the current password.', example: 'SecurePass123!', required: false })
    @IsString()
    @IsOptional()
    password : string
}