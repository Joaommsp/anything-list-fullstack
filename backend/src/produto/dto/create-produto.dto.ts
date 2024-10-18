/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
