import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { response } from 'express';
import { User } from './entities/user.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  

  @Post('registrar')
  register(@Body() createUserDto: CreateUserDto) {

      return this.usersService.create(createUserDto)
  }

  @Get('private')
//@UseGuards(AuthGuard())
  PruebaRuta(){
      return{
          ok: true,
          message:'Accedió correctamente'
      }
  }
  
    @Post('login')
    loginUser(@Body() loginUserDto:CreateUserDto){
        return this.usersService.login(loginUserDto)
        
    }

    @Get('listar')
    //@UseGuards(AuthGuard())
    getAll(@Res()response) {
        return this.usersService.getAll()
      
    }   
    

    @Put(':id')
    update(@Body() updateUserDto: CreateUserDto, @Res()response,@Param('id')idUsuario){
       //return this.usersService.updatedUser(idUser,updateUserDto)
        this.usersService.updatedUser(idUsuario, updateUserDto).then(
            response.status(HttpStatus.OK).json(User)
        ).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({usuario:'Error al intentar editar del usuario'})
        })
    } 
    @Delete(':id')
    delete(@Res()response,@Param('id') idUser){

      // return this.usersService.deleteUser(idUser)
        this.usersService.deleteUser(idUser).then(res=>
            response.status(HttpStatus.OK).json(res)
        ).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({usuario:'Error al intentar eliminar el usuario'})
        })
    }
}
