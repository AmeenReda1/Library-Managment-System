import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowerDto } from './create-borrowers.dto';

export class UpdateBorrowersDto extends PartialType(CreateBorrowerDto) {}
