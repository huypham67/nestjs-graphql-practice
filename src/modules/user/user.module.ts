import { Module } from '@nestjs/common';
import { UserResolver } from 'src/modules/user/user.resolver';
import { UserService } from 'src/modules/user/user.service';

@Module({
  providers: [UserService, UserResolver],
})
export class UserModule {}
