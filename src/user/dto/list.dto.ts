import { IsInt, Max, Min } from '@nestjs/class-validator';

export class ListDto {
  @IsInt()
  @Min(5)
  @Max(100)
  take: number;

  @IsInt()
  @Min(0)
  @Max(100)
  skip: number;
}
