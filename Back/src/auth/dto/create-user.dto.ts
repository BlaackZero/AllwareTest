import { IsEmail, IsNumber, IsString, Length } from "class-validator";


export class RegisterUsersDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(5,25)
    password: string;

    @IsString()
    @Length(5,50)
    name: string;

    @IsString()
    phone: string;

    @IsNumber()
    companyId: number;

    @IsNumber()
    rolId: number;
}