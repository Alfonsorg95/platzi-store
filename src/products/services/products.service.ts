import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterID = 1; // Only for educational purposes, the real Id is given by the database

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is Product 1 description',
      price: 1200,
      stock: 300,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
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

  create(payload: CreateProductDto) {
    this.counterID += 1;
    const newProduct = {
      id: this.counterID,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
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
