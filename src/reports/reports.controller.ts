import { Controller ,Post , Body ,UseGuards , Patch , Param, ParseIntPipe, Get, Query} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../gaurds/auth.guards.js';
import { CurrentUser } from '../users/decorators/current-user.decorator.js';
import { User } from '../users/users.entity.js';
import { Serialize } from '../interceptors/serialize.interceptor.js';
import { ReportDto } from './dto/repot.dto.js';
import { AdminGuard } from '../gaurds/admin.guards.js';
import { GenerateEstimateDto } from './dto/get-estimate.dto.js';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('reports')
export class ReportsController {
   constructor(private reportsService : ReportsService){}

   @UseGuards(AuthGuard )
   @Serialize(ReportDto)
    @ApiOperation({ summary: 'Create a vehicle report for the authenticated user.' })
    @Post()
    createReport(@Body()  body : CreateReportDto , @CurrentUser() user : User){
        return this.reportsService.create(body, user);
    }

    @ApiOperation({ summary: 'Get a vehicle price estimate.' })
    @Get()
    getEstimate(@Query() query : GenerateEstimateDto){

        return this.reportsService.createEstimate(query);
        
    }

    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Approve a vehicle report.' })
    @ApiParam({ name: 'id', description: 'ID of the report to approve.', example: 12 })
    @Patch('/:id')
    updateReport(@Param('id' , ParseIntPipe) id: number ){
        return this.reportsService.updateReport(id);
    }
}
