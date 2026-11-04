import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieSession from "cookie-session";
import { DocumentBuilder, SwaggerModule  } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


   if (process.env.NODE_ENV !== 'production') {

  const config = new DocumentBuilder()
  .setTitle('Car Bidding API')
  .setDescription('API for Car Bidding Application')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config); 

  SwaggerModule.setup('api', app, document);

   }


  app.use(cookieSession({
    keys:["aksdjks"]
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true
    })
  )
  console.log('Environment:', process.env.NODE_ENV);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
