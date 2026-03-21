import { Module } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/user.repository';
import { UserResolver } from 'src/modules/user/user.resolver';
import { UserService } from 'src/modules/user/user.service';

@Module({
  providers: [UserService, UserResolver, UserRepository],
  exports: [UserService],
})
export class UserModule {}
