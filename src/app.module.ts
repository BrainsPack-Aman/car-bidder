import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { User } from './users/users.entity.js';
import { Report } from './reports/reports.entity.js';
import {ConfigModule , ConfigService} from "@nestjs/config";
import { config } from 'process';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal : true,
     envFilePath:`.env.${process.env.NODE_ENV}`
    }),

    TypeOrmModule.forRootAsync({
      inject :[ConfigService],
      useFactory : (config : ConfigService)=>{
        return {
            type : "better-sqlite3",
            database :config.get<string>('DB_NAME'),
            entities:[User , Report],
            synchronize : true
        }
      }
    })
  //   TypeOrmModule.forRoot({
  //   type : "better-sqlite3",
  //   database :"db.sqlite",
  //   entities:[User , Report],
  //   synchronize : true
  // })

    ,UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
