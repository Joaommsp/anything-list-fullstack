/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProdutoService } from '../produto/produto.service';
import { CreateProdutoDto } from '../produto/dto/create-produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async create(
    @Body() createProdutoDto: CreateProdutoDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.id; // Agora não dá mais erro
    return this.produtoService.create({ ...createProdutoDto, userId });
  }
}
