import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { BrandsModule } from './brands/brands.module';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [VehiclesModule, BrandsModule, SellersModule]
})
export class AppModule {}
