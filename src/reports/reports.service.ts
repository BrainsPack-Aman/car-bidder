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


    async createEstimate({ make, model, lng, lat, year, mileage }: GenerateEstimateDto) {
  const subQuery = this.repo
    .createQueryBuilder("report")
    .select("report.price", "price")
    .where("report.make = :make", { make })
    .andWhere("report.model = :model", { model })
    .andWhere("report.lng - :lng BETWEEN -5 AND 5", { lng })
    .andWhere("report.lat - :lat BETWEEN -5 AND 5", { lat })
    .andWhere("report.year - :year BETWEEN -3 AND 3", { year })
    .andWhere("report.approved IS TRUE")
    .orderBy("ABS(report.mileage - :mileage)", "ASC")
    .limit(3);

  return this.repo.manager
    .createQueryBuilder()
    .select("AVG(report.price)", "price")
    .from(`(${subQuery.getQuery()})`, "report")
    .setParameters({ ...subQuery.getParameters(), mileage })
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
