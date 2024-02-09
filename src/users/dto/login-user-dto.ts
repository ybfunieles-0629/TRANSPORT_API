import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class loginUserDto{
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
}