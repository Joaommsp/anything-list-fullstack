/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ProdutoModule } from './produto/produto.module';
import { AuthModule } from './auth/auth.module';
import { JwtConfigModule } from './jwt/jwt.module';

@Module({
  imports: [DbModule, ProdutoModule, AuthModule, JwtConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
