import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('filter')
  getProductFilter() {
    return `This is a filter`;
  }
  //Este endpoint es estatito, debe ir sobre los dinamicos

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return `product ${id}`;
  }
  //Este endpoint recive un parametro

  @Get()
  getProducts(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products: limit:${limit} offset:${offset} brand: ${brand}`;
  }
  //Este endpoint recive un query
}
