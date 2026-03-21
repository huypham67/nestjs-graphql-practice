import { Module } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/user.repository';
import { UserResolver } from 'src/modules/user/user.resolver';
import { UserService } from 'src/modules/user/user.service';
import { UserLoader } from 'src/modules/user/user.loader';

@Module({
  providers: [UserService, UserResolver, UserRepository, UserLoader],
  exports: [UserService, UserLoader],
})
export class UserModule {}
