import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCategoryDto,
  CreateProductDto,
  UpdateCategoryDto,
  UpdateProductDto,
} from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Productos
  async createProduct(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async findAllProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
    });
  }

  async findOneProduct(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID: #${id} no encontrado`);
    }
    return this.prisma.product.findUnique({ where: { id } });
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID: #${id} no encontrado`);
    }
    return this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID: #${id} no encontrado`);
    }
    return this.prisma.product.delete({ where: { id } });
  }

  // Categorías
  async createCategory(data: CreateCategoryDto) {
    return this.prisma.productCategory.create({ data });
  }

  async findAllCategories() {
    return this.prisma.productCategory.findMany();
  }

  async findOneCategory(id: number) {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Categoria con ID: ${id} no encontrada`);
    }
    return category;
  }

  async updateCategory(id: number, data: UpdateCategoryDto) {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Categoria con ID: ${id} no encontrada`);
    }
    return this.prisma.productCategory.update({ where: { id }, data });
  }

  async deleteCategory(id: number) {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Categoria con ID: ${id} no encontrada`);
    }
    return this.prisma.product.delete({ where: { id } });
  }
}
