import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    VehiclesService: VehiclesService;

    constructor(private vehiclesService: VehiclesService){}

    @Post('/getSelled')
    async getAllUsers(@Req() request: Request, @Res() response: Response):Promise<any>{
        try{
            const result = await this.vehiclesService.getAllSelledVehicles();
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

    @Post('/addVehicle')
    async addVehicle(@Req() request: Request, @Res() response: Response):Promise<any>{
        try{
            const result = await this.vehiclesService.addVehicle(request.body);
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

    @Post('/delete')
    async deleteVehicle(@Req() request: Request, @Res() response: Response):Promise<any>{
        try{
            const result = await this.vehiclesService.deleteVehicle(request.body.id);
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