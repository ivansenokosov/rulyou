import { IsInt, IsPositive } from '@nestjs/class-validator';

export class DeleteGearTypeDto {
  @IsInt({ message: 'id должно быть целым числом' })
  @IsPositive({ message: 'id должно быть положительным числом' })
  id: number;
}
