import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  isbn: number;
  @Column('text')
  title: string;
  @Column('text')
  author: string;
  @Column('text')
  shelfLocation: string;
  @Column()
  availableQuantity: number;
}
