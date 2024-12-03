import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { RolesGuard } from './common/guards/roles.guard';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/product.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    UploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_GUARD', useClass: AtGuard },
    { provide: 'APP_GUARD', useClass: RolesGuard },
  ],
})
export class AppModule {}
