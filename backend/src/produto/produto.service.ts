/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private readonly prismaservice: PrismaService) {}

  create(data: CreateProdutoDto) {
    return this.prismaservice.produto.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }

  findAll(userId: number) {
    return this.prismaservice.produto.findMany({
      where: { userId: userId },
    });
  }

  findOne(id: number) {
    return this.prismaservice.produto.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return this.prismaservice.produto.update({
      where: { id },
      data: {
        ...(updateProdutoDto.userId && {
          user: {
            connect: { id: updateProdutoDto.userId },
          },
        }),
        name: updateProdutoDto.name,
        price: updateProdutoDto.price,
        description: updateProdutoDto.description,
      },
    });
  }

  remove(id: number) {
    return this.prismaservice.produto.delete({ where: { id } });
  }
}
