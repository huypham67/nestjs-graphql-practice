import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import path from 'path';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join('src/schema.gql'),
      //playground: true,
    }),
    UserModule,
    SharedModule,
    PostModule,
  ],
})
export class AppModule {}
