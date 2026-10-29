import { 
    ClassSerializerInterceptor,
    NestInterceptor,
    ExecutionContext,
    CallHandler, 
    UseInterceptors
         
 } from "@nestjs/common";

 import { Observable } from "rxjs";
 import {plainToClass} from "class-transformer";
 import { map } from "rxjs";
 import { UserDto } from "../users/dtos/user.dto.js";


 interface ClassConstructor{
    new (...args : any[]) :{}
 }


 export function Serialize(dto : ClassConstructor){

    return UseInterceptors( new SerializeInterceptor(UserDto))
 }


 export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto : ClassConstructor){}

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