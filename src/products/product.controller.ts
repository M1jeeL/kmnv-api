import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from 'src/common/decorators';

@UseGuards(RolesGuard)
@Controller('')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post('products')
  @Roles(UserRole.ADMIN)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Public()
  @Get('products')
  async findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Public()
  @Get('products/:id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOneProduct(Number(id));
  }

  @Patch('products/:id')
  @Roles(UserRole.ADMIN)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(Number(id), updateProductDto);
  }

  @Delete('products/:id')
  @Roles(UserRole.ADMIN)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(Number(id));
  }

  // Categorías
  @Post('categories')
  @Roles(UserRole.ADMIN)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Public()
  @Get('categories')
  async findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('categories/:id')
  async findOneCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOneCategory(Number(id));
  }

  @Patch('categories/:id')
  @Roles(UserRole.ADMIN)
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.productsService.updateCategory(Number(id), updateCategoryDto);
  }

  @Delete('categories/:id')
  @Roles(UserRole.ADMIN)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteCategory(Number(id));
  }
}
