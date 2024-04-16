import { Module } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { BorrowersController } from './borrowers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrower } from './borrower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrower])],
  providers: [BorrowersService],
  controllers: [BorrowersController],
})
export class BorrowersModule {}
