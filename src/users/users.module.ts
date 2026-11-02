import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service.js';
import { User } from './users.entity.js';
import { AuthService } from './auth.service.js';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware.js';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService , 
    AuthService ,]
})
export class UsersModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
