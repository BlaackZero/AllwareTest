import { Length, IsString, IsEmail } from "class-validator";

export class LoginDto {

    @IsEmail()
    email: string;

    @IsString()
    @Length(5,25)
    password: string;
}