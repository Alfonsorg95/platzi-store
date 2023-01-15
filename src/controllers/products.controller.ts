import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from 'src/services/products.service';
//import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('filter')
  getProductFilter() {
    return {
      message: `This is a filter`,
    };
  }
  //Este endpoint es estatito, debe ir sobre los dinamicos

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
    /* return {
      message: `product ${id}`,
    }; */
  }
  //Este endpoint recive un parametro

  @Get()
  getProducts(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();

    /* return {
      message: `products: limit:${limit} offset:${offset} brand: ${brand}`,
    }; */
  }
  //Este endpoint recive un query

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
    /* return {
      message: 'Create action',
      payload,
    }; */
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
    /* return {
      id,
      payload,
    }; */
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
    //return id;
  }
}
