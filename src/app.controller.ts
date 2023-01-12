import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('imnew')
  newEndpoint() {
    return 'im new on nest';
  }
  //Nuevo endpoint en el controlador

  @Get('product/filter')
  getProductFilter() {
    return `This is a filter`;
  }
  //Este endpoint es estatito, debe ir sobre los dinamicos

  @Get('product/:id')
  getProduct(@Param('id') id: string) {
    return `product ${id}`;
  }
  //Este endpoint recive un parametro

  @Get('categories/:categoryId/products/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return `category ${categoryId} product ${productId}`;
  }
  //Este endpoint recive mas de un parametro

  @Get('products')
  getProducts(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products: limit:${limit} offset:${offset} brand: ${brand}`;
  }
  //Este endpoint recive un query
}
