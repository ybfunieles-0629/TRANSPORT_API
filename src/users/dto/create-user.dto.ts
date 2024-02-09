import { IsDate, IsEmail, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    documentType:string;

    @IsNumber()
    @MinLength(7)
    @MaxLength(10)
    document:number;

    @IsString()
    @MinLength(3, {
        message:"El nombre debe tener al menos 3 caracteres"
    })
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    sex:string;

    @IsString()
    location:string;

    @IsNumber()
    @MinLength(7)
    @MaxLength(10)
    phone: number;
    
    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\w+))(?![.\n])(?=.[A-Z])(?=.*[a-z]).*$/,{
            message:"La contraseña debe tener una letra mayúscula, minúscula y un número"
        })
    password :string;

    @IsString()
    photography:string;

    @IsDate()
    createAt:Date;

    @IsDate()
    updateAt:Date;
    
 
}
