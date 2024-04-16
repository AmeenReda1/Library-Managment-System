import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Borrower } from 'src/borrowers/borrower.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Borrower)
    private borrowerRepository: Repository<Borrower>,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const existingUser = await this.borrowerRepository.findOne({
      where: { email },
    });
    if (!existingUser) {
      throw new NotFoundException(`There Isn't User With Email ${email}`);
    }
    const isMatched = await bcrypt.compare(pass, existingUser.password);
    if (!isMatched) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { sub: existingUser.id, username: existingUser.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
