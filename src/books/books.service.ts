import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/Create-books.dto';
import { UpdateBookDto } from './dtos/update-books.dto';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}
  async findBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }
  async findBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Not Found Book For This id: ${id}`);
    }
    return book;
  }
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { isbn } = createBookDto;

    // Check if a book with the same ISBN already exists
    const existingBook = await this.bookRepository.findOne({ where: { isbn } });
    if (existingBook) {
      throw new ConflictException(`A book with ISBN ${isbn} already exists`);
    }
    const newBook = await this.bookRepository.save(createBookDto);
    return newBook;
  }
  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const bookToUpdate = await this.findBookById(id);
    if (!bookToUpdate) {
      throw new NotFoundException(`Not Found Book For this id: ${id}`);
    }
    const updatedBook = { ...bookToUpdate, ...updateBookDto };
    return await this.bookRepository.save(updatedBook);
  }

  async deleteBook(id: number): Promise<void> {
    await this.bookRepository.delete({ id });
  }
}
