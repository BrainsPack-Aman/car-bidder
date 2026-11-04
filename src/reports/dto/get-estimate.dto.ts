import { IsNumber, IsString ,Min , Max , IsLongitude , IsLatitude } from "class-validator";
import { Transform } from "class-transformer" ;
import { ApiProperty } from "@nestjs/swagger";
export class GenerateEstimateDto{

    
    
        @ApiProperty({ description: 'Vehicle manufacturer to use for the estimate.', example: 'Royals Royce' })
        @IsString()
        make : string;
    
        @ApiProperty({ description: 'Vehicle model to use for the estimate.', example: 'Cullian' })
        @IsString()
        model : string;
    

        @ApiProperty({ description: 'Vehicle model year (1930–2050).', example: 2023 })
        @Transform(({value  }) => typeof value === 'string' ? parseInt(value) : value)
        @IsNumber()
        @Min(1930)
        @Max(2050)
        year : number;
        
       
        @ApiProperty({ description: 'Longitude of the vehicle location, from -180 to 180.', example: 74.2 })
        @Transform(({value }) => typeof value === 'string' ? parseFloat(value) : value)
        @IsLongitude()
        lng : number;
        

      
        @ApiProperty({ description: 'Latitude of the vehicle location, from -90 to 90.', example: 28.5 })
        @Transform(({value }) => typeof value === 'string' ? parseFloat(value) : value)
        @IsLatitude()
        lat : number;
        

        @ApiProperty({ description: 'Vehicle mileage in miles.', example: 42000 })
        @Transform(({value }) => typeof value === 'string' ? parseInt(value) : value)
        @IsNumber()
        @Min(0)
        @Max(1000000)
        mileage : number
}