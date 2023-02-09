import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Between, FindOptionsWhere } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { Product } from 'src/products/entities/product.entity';
import { Category } from '../entities/category.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandsRepo: Repository<Brand>,
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        if (minPrice > maxPrice) {
          throw new BadRequestException(
            'Max price must be greater than min price',
          );
        }
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand', 'categories'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand', 'categories'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id: id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    if (payload.brandId) {
      const brand = await this.brandsRepo.findOneBy({ id: payload.brandId });
      newProduct.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoriesRepo.findBy({
        id: In(payload.categoriesIds),
      });
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);
    if (payload.brandId) {
      const brand = await this.brandsRepo.findOneBy({ id: payload.brandId });
      product.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoriesRepo.findBy({
        id: In(payload.categoriesIds),
      });
      product.categories = categories;
    }
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async deleteCategory(id: number, categoryId: number) {
    const product = await this.findOne(id);
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategory(id: number, categoryId: number) {
    const product = await this.findOne(id);
    const category = await this.categoriesRepo.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException(`Category id: ${id} not found`);
    }
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.productRepo.delete(id);
  }
}
