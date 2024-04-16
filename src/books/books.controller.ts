import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  HttpCode,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateBookDto } from './dtos/Create-books.dto';
import { BooksService } from './books.service';
import { Book } from './book.entity';

import { UpdateBookDto } from './dtos/update-books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findBooks();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    return await this.bookService.findBookById(id);
  }
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.createBook(createBookDto);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateBook(id, updateBookDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.bookService.deleteBook(id);
  }
}
