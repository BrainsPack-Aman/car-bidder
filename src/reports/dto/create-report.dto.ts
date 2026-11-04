import { IsNumber, IsString ,Min , Max , IsLongitude , IsLatitude } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateReportDto{

    
        
        @IsNumber()
        @ApiProperty({ description: 'Vehicle asking price in dollars.', example: 28500 })
        @Min(0)
        @Max(1000000)
        price : number;
    
        @ApiProperty({ description: 'Vehicle manufacturer.', example: 'Toyota' })
        @IsString()
        make : string;
    
        @ApiProperty({ description: 'Vehicle model.', example: 'Camry' })
        @IsString()
        model : string;
    
        @ApiProperty({ description: 'Vehicle model year (1930–2050).', example: 2022 })
        @IsNumber()
        @Min(1930)
        @Max(2050)
        year : number;
    
        @ApiProperty({ description: 'Longitude of the vehicle location, from -180 to 180.', example: -73.9857 })
        @IsLongitude()
        lng : number;
    
        @ApiProperty({ description: 'Latitude of the vehicle location, from -90 to 90.', example: 40.7484 })
        @IsLatitude()
        lat : number;
    
        @ApiProperty({ description: 'Vehicle mileage in miles.', example: 32000 })
        @IsNumber()
        @Min(0)
        @Max(1000000)
        mileage : number
}