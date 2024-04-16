import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBorrowerDto {
  @IsNotEmpty({ message: 'Borrower Name Is Required' })
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @IsNotEmpty({ message: 'Borrower Email Is Required' })
  @IsEmail({}, { message: 'Invalid Email Format' })
  email: string;

  @IsNotEmpty({ message: 'Borrower Password Is Required' })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
