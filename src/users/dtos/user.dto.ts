import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto{

    @ApiProperty({ description: 'Unique identifier of the user.', example: 7 })
    @Expose()
    id: number;

    @ApiProperty({ description: 'Email address associated with the user account.', example: 'driver@example.com' })
    @Expose()
    email: string   

}