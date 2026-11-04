import{Expose ,Transform} from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ReportDto{

    @ApiProperty({ description: 'Unique identifier of the report.', example: 12 })
    @Expose()
    id : number;

    @ApiProperty({ description: 'Whether an administrator approved the report.', example: false })
    @Expose()
    approved : boolean;

    @ApiProperty({ description: 'Estimated or listed price of the vehicle.', example: 28500 })
    @Expose()
    price : number;

    @ApiProperty({ description: 'Vehicle manufacturer.', example: 'Toyota' })
    @Expose()
    make : string;

    @ApiProperty({ description: 'Vehicle model.', example: 'Camry' })
    @Expose()
    model : string;

    @ApiProperty({ description: 'Vehicle model year.', example: 2022 })
    @Expose()
    year : number;

    @ApiProperty({ description: 'Vehicle longitude coordinate.', example: -73.9857 })
    @Expose()
    lng : number;

    @ApiProperty({ description: 'Vehicle latitude coordinate.', example: 40.7484 })
    @Expose()
    lat : number;

    @ApiProperty({ description: 'Vehicle mileage.', example: 32000 })
    @Expose()
    mileage : number;

    @ApiProperty({ description: 'ID of the user who created the report, or null if unavailable.', example: 7, nullable: true })
    @Transform(({ obj }) => {
    return obj.user?.id ?? null;
})
@Expose()
userId: number;
}