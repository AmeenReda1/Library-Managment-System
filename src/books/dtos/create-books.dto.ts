import { IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';
export class CreateBookDto {
  @IsNotEmpty({ message: 'ISBN is required' })
  isbn: number;
  @IsNotEmpty({ message: 'Book Title is required' })
  @MinLength(3, {
    message: 'Book Title is too short',
  })
  @MaxLength(50, {
    message: 'Book Title is too long',
  })
  title: string;
  @IsNotEmpty({ message: 'Author Name is required' })
  @MinLength(3, {
    message: 'Author Name is too short',
  })
  @MaxLength(20, {
    message: 'Author Name is too long',
  })
  author: string;
  @Min(1, { message: 'available quantity must be at least one book' })
  availableQuantity: number;

  @IsNotEmpty()
  shelfLocation: string;
}
