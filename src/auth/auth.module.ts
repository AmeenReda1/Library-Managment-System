import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Borrower } from 'src/borrowers/borrower.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BorrowersModule } from 'src/borrowers/borrowers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'), // Replace with your own secret key
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        }, // Optional: Configure expiration time
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Borrower]),
    
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
