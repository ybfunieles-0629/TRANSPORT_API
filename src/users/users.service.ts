import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { loginUserDto } from './dto/login-user-dto';
import { Repository } from 'typeorm';
import * as bcrypt from'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { JwtPayload } from './entities/jwtPayload';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService:JwtService
  ){}

  
    async getAll(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async create(createUserDto:CreateUserDto){
    const newUser =  this.userRepository.create(createUserDto);
     const {password} = createUserDto;
     const plainToHash = await bcrypt.hash(password,10)
     createUserDto={...createUserDto,password:plainToHash};
     const findUser= await this.userRepository.save(createUserDto)
     
     return {
        ...newUser,
        token: this.getJwtToken({email: findUser.email})};

}

      async login(loginUserDto: CreateUserDto) {
        const {email,password} = loginUserDto;
        const findUser = await this.userRepository.findOne({ where:{email}});
        if (!findUser) throw new HttpException('Credenciales incorrectas',404)

        const checkPassword = await bcrypt.compare(password, findUser.password)

        if(!checkPassword)throw new HttpException('Credenciales incorrectas',403);

        const payload ={id: findUser.id, name : findUser.name}
        const token = this.jwtService.sign(payload);
        const data ={ 
        User:findUser,

        token,
        }

        return {
            ...data,
      token: this.getJwtToken({email: findUser.email})
      } ;

      }
      async updatedUser(idUser:number ,usuarioActualizar:CreateUserDto):Promise<User> {
        const userUpdate = await this.userRepository.findOne({ where:{id:idUser}})
        userUpdate.documentType=usuarioActualizar.documentType;
        userUpdate.document=usuarioActualizar.document;
        userUpdate.name = usuarioActualizar.name;
        userUpdate.lastName = usuarioActualizar.lastName;
        userUpdate.sex = usuarioActualizar.sex;
        userUpdate.location = usuarioActualizar.location;
        userUpdate.phone = usuarioActualizar.phone;
        userUpdate.photography = usuarioActualizar.photography;
        return await this.userRepository.save(userUpdate)
    }

    async deleteUser(idUser:number):Promise<any>{
      return await this.userRepository.delete(idUser)
  }


private getJwtToken(payload:JwtPayload){

  const token = this.jwtService.sign(payload);
  return token;

}


}