import { Injectable} from '@nestjs/common';
import { Report } from './reports.entity.js';
import { InjectRepository  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto.js';
import { User } from '../users/users.entity.js';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo : Repository<Report>){}

   async create(reportDto: CreateReportDto, user: User) {

    const report = this.repo.create(reportDto);

    report.user = user;

  

    const savedReport = await this.repo.save(report);


    return savedReport;
}


    async updateReport(id : number){
        const report = await this.repo.findOneBy({id});
         if(!report){
            throw new Error(`Report with id ${id} not found`);
         }
         
         report.approved = report.approved ? false : true;
         return await this.repo.save(report);
    }
}
