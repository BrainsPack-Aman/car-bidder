import { Injectable} from '@nestjs/common';
import { Report } from './reports.entity.js';
import { InjectRepository  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto.js';
import { User } from '../users/users.entity.js';
import { GenerateEstimateDto } from './dto/get-estimate.dto.js';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo : Repository<Report>){}


    async createEstimate({make,model ,lng,lat,year,mileage} : GenerateEstimateDto){
        return this.repo.createQueryBuilder()
        .select("AVG(price)","price")
        .where("make = :make", {make })
        .andWhere("model = :model", {model})
        .andWhere("lng - :lng BETWEEN -5 AND 5", {lng})
        .andWhere("lat - :lat BETWEEN -5 AND 5", {lat})
        .andWhere("year - :year BETWEEN -3 AND 3", {year})
        .andWhere("approved IS TRUE")
        .orderBy("ABS(mileage - :mileage)", "DESC")
        .setParameters({mileage})
        .limit(3)
        
        .getRawOne();
    }

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
