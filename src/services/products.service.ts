import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterID = 1; // Only for educational purposes, the real Id is given by the database

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is Product 1 description',
      price: 120,
      stock: 0,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`);
    }
    return product;
  }

  create(payload: any) {
    this.counterID += 1;
    const newProduct = {
      id: this.counterID,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product id: ${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
