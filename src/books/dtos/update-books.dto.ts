import { CreateBookDto } from './Create-books.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateBookDto extends PartialType(CreateBookDto) {}
