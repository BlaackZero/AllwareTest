import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
    BrandsService: BrandsService;

    constructor(private brandsServices: BrandsService){}

    @Post('/getModelsBrands')
    async getAllUsers(@Req() request: Request, @Res() response: Response):Promise<any>{
        try{
            const result = await this.brandsServices.getAll();
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