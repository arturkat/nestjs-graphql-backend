import { ExecutionContext, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionModule } from 'nestjs-session';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import { TodoModule } from '@src/todo/todo.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from '@src/auth/guards/accessToken.guard';
import { AuthModule } from '@src/auth/auth.module';
import { GlobalInterceptor } from '@src/utils/interceptors/global.interceptor';

@Module({
  imports: [
    SessionModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          session: {
            secret: config.get<string>('SESSION_SECRET'),
            resave: false,
            saveUninitialized: false,
          },
        };
      },
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          context: ({ req, res }) => {
            return { req, res };
          },
          cors: {
            origin: config.get<string>('CLIENT_URL'),
            credentials: true,
          },
          autoSchemaFile: join(
            process.cwd(),
            config.get<string>('SCHEMA_PATH'),
          ),
          installSubscriptionHandlers: true,
          sortSchema: true,
          playground: true,
          debug: true,
        };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    PaymentModule,
    TodoModule,
    AuthModule,
  ],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
    // { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
})
export class AppModule {}
