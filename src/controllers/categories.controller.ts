import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':categoryId/products/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return {
      message: `category ${categoryId} product ${productId}`,
    };
  }
  //Este endpoint recive mas de un parametro
}
