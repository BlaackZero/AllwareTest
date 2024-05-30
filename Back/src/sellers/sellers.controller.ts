import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { SellersService } from './sellers.service';

@Controller('sellers')
export class SellersController {
    SellersService: SellersService;

    constructor(private sellersService: SellersService){}

    @Post('/getSellers')
    async getAllUsers(@Req() request: Request, @Res() response: Response):Promise<any>{
        try{
            const result = await this.sellersService.getAllSellers();
            return response.status(200).json({
                status: 'Ok!',
                message: 'Succesfuly fetch data!',
                result: result
            })
        }catch(error){
            return response.status(500).json({
                status: 'Ok!',
                message: 'Internal Server Error!'
            })
        }
    }
}