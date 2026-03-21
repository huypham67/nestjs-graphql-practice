import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { User } from 'src/modules/user/user.dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class UserLoader {
  constructor(private readonly userService: UserService) {}

  public readonly batchUsers = new DataLoader<number, User | null>(
    async (userIds: readonly number[]) => {
      const users = await this.userService.findManyByIds(userIds as number[]);

      const userMap = new Map(users.map((u) => [u.id, u]));

      return userIds.map((id) => userMap.get(id) || null);
    },
  );
}
