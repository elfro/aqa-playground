import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsModule } from '../payments/payments.module';
import { LoggerModule } from 'nestjs-pino';
import { PaymentsController } from '../payments/payments.controller';
import { ProductsController } from '../products/products.controller';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from '../auth/auth.controller';
import { UsersController } from '../users/users.controller';
import * as process from 'process';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: Boolean(process.env.DB_LOGGING),
      synchronize: true,
      autoLoadEntities: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            crlf: false,
          },
        },
      },
      forRoutes: [PaymentsController, ProductsController, AuthController, UsersController],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PaymentsModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
  ],
})
export class AppModule {}
