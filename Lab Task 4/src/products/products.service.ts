import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const saved = await this.productsRepo.save(product);
    return { message: 'Product created successfully', data: saved };
  }

  async findAll() {
    const products = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'Products retrieved successfully',
      count: products.length,
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.getProductOrFail(id);
    return { message: 'Product retrieved successfully', data: product };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    const product = await this.getProductOrFail(id);
    Object.assign(product, dto);
    const updated = await this.productsRepo.save(product);
    return { message: 'Product updated successfully', data: updated };
  }

  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.getProductOrFail(id);
    Object.assign(product, dto);
    const updated = await this.productsRepo.save(product);
    return { message: 'Product replaced successfully', data: updated };
  }

  async remove(id: number) {
    await this.getProductOrFail(id);
    await this.productsRepo.delete(id);
    return { message: 'Product deleted successfully', id };
  }

  async findByCategory(category: string) {
    const products = await this.productsRepo.find({
      where: { category: ILike(category) },
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'Products filtered by category',
      count: products.length,
      data: products,
    };
  }

  async search(keyword: string) {
    const products = await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) },
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'Product search completed',
      count: products.length,
      data: products,
    };
  }

  async toggleActive(id: number) {
    const product = await this.getProductOrFail(id);
    product.isActive = !product.isActive;
    const updated = await this.productsRepo.save(product);
    return { message: 'Product status toggled successfully', data: updated };
  }

  private async getProductOrFail(id: number): Promise<Products> {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }
}