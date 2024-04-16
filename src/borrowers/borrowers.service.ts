import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrower } from './borrower.entity';
import { Repository } from 'typeorm';
import { UpdateBorrowersDto } from './dtos/update-borrowers.dto';
import { CreateBorrowerDto } from './dtos/create-borrowers.dto';

@Injectable()
export class BorrowersService {
  constructor(
    @InjectRepository(Borrower)
    private borrowerRepository: Repository<Borrower>,
  ) {}
  async findAllBorrowers(): Promise<Borrower[]> {
    return await this.borrowerRepository.find();
  }
  async findBorrowerById(id: number): Promise<Borrower> {
    return await this.borrowerRepository.findOne({ where: { id } });
  }
  async createBorrower(
    createBorrowerDto: CreateBorrowerDto,
  ): Promise<Borrower> {
    const { email } = createBorrowerDto;
    const existingBorrower = await this.borrowerRepository.find({
      where: { email },
    });
    console.log(existingBorrower);
    if (existingBorrower.length > 0) {
      throw new ConflictException(
        `This Email ${email} is used  By anthor Borrower`,
      );
    }
    const newBorrower = await this.borrowerRepository.create(createBorrowerDto);
    return await this.borrowerRepository.save(newBorrower);
  }

  async updateBorrower(
    id: number,
    updateBorrowerDto: UpdateBorrowersDto,
  ): Promise<Borrower> {
    const borrowerToUpdate = await this.findBorrowerById(id);
    if (!borrowerToUpdate) {
      throw new NotFoundException(`There isn't Borrower With This Id ${id}`);
    }
    const updatedBorrower = { ...borrowerToUpdate, ...updateBorrowerDto };
    return await this.borrowerRepository.save(updatedBorrower);
  }
  async deleteBorrower(id: number): Promise<void> {
    const existingBorrower = this.findBorrowerById(id);
    if (!existingBorrower) {
      throw new NotFoundException(`there isn't Borrower With this ${id}`);
    }
    await this.borrowerRepository.delete({ id });
  }
  
}
