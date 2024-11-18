import { IsString, Length, IsInt, IsOptional } from '@nestjs/class-validator';

export class PatchUserDto {
  @IsString({ message: 'Поле full_name должно быть строкой' })
  @Length(4, 100, {
    message: 'Поле full_name должно иметь длину от 4 до 100 символов',
  })
  @IsOptional()
  readonly full_name: string;

  @IsString({ message: 'Поле role должно быть строкой' })
  @Length(4, 100, {
    message: 'Поле role должно иметь длину от 4 до 100 символов',
  })
  @IsOptional()
  readonly role: string;

  @IsInt({ message: 'Поле efficiency должно быть целым числом' })
  @IsOptional()
  readonly efficiency: number;
}
