import { IsString, Length, IsInt } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString({ message: 'Поле full_name должно быть строкой' })
  @Length(4, 100, {
    message: 'Поле full_name должно иметь длину от 4 до 100 символов',
  })
  readonly full_name: string;

  @IsString({ message: 'Поле role должно быть строкой' })
  @Length(1, 100, {
    message: 'Поле role должно иметь длину от 1 до 100 символов',
  })
  readonly role: string;

  @IsInt({ message: 'Поле efficiency должно быть целым числом' })
  readonly efficiency: number;
}
