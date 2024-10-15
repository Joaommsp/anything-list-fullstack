/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: '12345678',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
