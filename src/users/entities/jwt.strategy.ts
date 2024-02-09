import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from '../users.service';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstanst } from "./jwt.constanst";
import { JwtPayload } from "./jwtPayload";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy) {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    configService: ConfigService
    ) {
    super({
        secretOrKey: configService.get('secret'),
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    });
    }

    async validate(payload: JwtPayload): Promise<User> {

        const {email} = payload;

        const user = await this.userRepository.findOneBy({email})

        if(!user) 
        throw new UnauthorizedException('Token inválido')
    return user
    }
    }
