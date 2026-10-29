import { 
    ClassSerializerInterceptor,
    NestInterceptor,
    ExecutionContext,
    CallHandler 
         
 } from "@nestjs/common";

 import { Observable } from "rxjs";
 import {plainToClass} from "class-transformer";
 import { map } from "rxjs";


 export class SerializeInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run something before a request is handled by the request handler

         console.log("I am running before the handler" , context);



         return next.handle().pipe(

            map((data)=>{
                // Run something before the response sent out

                console.log("I am running before the response is sent out" , data)
            })
         )
    }
 }