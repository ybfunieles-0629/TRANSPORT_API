import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstanst } from "./entities/jwt.constanst";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./entities/jwt.strategy";
import { config } from 'process';
import { from } from 'rxjs';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
          global: true,
          secret: jwtConstanst.secret,
        signOptions:{expiresIn:'60 s'},
        }),
        ConfigModule,
        TypeOrmModule.forFeature([User]),

       
    
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject:[ConfigService],
          useFactory:(configService:ConfigService) =>{
            return{
              secret: configService.get('secret'),
              signOptions:{
                expiresIn:'2h'
              }
            }
          }
        })
  ],
  controllers: [UsersController],
  providers: [ UsersService, JwtStrategy,PassportModule,JwtModule,JwtService],
  exports:[TypeOrmModule, JwtStrategy, PassportModule, JwtModule,UsersService]
})
export class UsersModule {}
