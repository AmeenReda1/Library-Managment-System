import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  HttpCode,
} from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { Borrower } from './borrower.entity';
import { CreateBorrowerDto } from './dtos/create-borrowers.dto';
import { UpdateBorrowersDto } from './dtos/update-borrowers.dto';
@Controller('borrowers')
export class BorrowersController {
  constructor(private readonly borrowerService: BorrowersService) {}
  @Get()
  async findAll(): Promise<Borrower[]> {
    return await this.borrowerService.findAllBorrowers();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Borrower> {
    return await this.borrowerService.findBorrowerById(id);
  }
  @Post()
  async createOne(
    @Body() createBorrowerDto: CreateBorrowerDto,
  ): Promise<Borrower> {
    return await this.borrowerService.createBorrower(createBorrowerDto);
  }
  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBorrowerDto: UpdateBorrowersDto,
  ): Promise<Borrower> {
    return await this.borrowerService.updateBorrower(id, updateBorrowerDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.borrowerService.deleteBorrower(id);
  }
}
