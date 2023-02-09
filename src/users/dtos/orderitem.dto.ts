import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  @IsInt()
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @IsInt()
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @IsInt()
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
