import { Controller ,Post , Body ,UseGuards} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../gaurds/auth.guards.js';
import { CurrentUser } from '../users/decorators/current-user.decorator.js';
import { User } from '../users/users.entity.js';
import { Serialize } from '../interceptors/serialize.interceptor.js';
import { ReportDto } from './dto/repot.dto.js';

@Controller('reports')
export class ReportsController {
   constructor(private reportsService : ReportsService){}

   @UseGuards(AuthGuard )
   @Serialize(ReportDto)
    @Post()
    createReport(@Body()  body : CreateReportDto , @CurrentUser() user : User){
        return this.reportsService.create(body, user);
    }
}
