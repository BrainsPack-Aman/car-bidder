import { 
    ClassSerializerInterceptor,
    NestInterceptor,
    ExecutionContext,
    CallHandler 
         
 } from "@nestjs/common";

 import { Observable } from "rxjs";
 import {plainToClass} from "class-transformer";
 import { map } from "rxjs";
 import { UserDto } from "../users/dtos/user.dto.js";


 export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto : any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        
       
         return next.handle().pipe(

            map((data)=>{
               return plainToClass(this.dto,data,{
                excludeExtraneousValues:true, 
               })
            })
         )
    }
 }