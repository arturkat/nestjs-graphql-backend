import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { Session } from '@src/auth/decorators/session.decorator';
import { Public } from '@src/auth/decorators/public.decorator';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  findAll(@Session() session, @Context() ctx) {
    // session.views = (session.views || 0) + 1;
    // console.log(`findAll:`);
    // console.log(`findAll: session.views: ${session.views}`);

    // console.log(`ctx.req: ${ctx.req.sessionID}`);
    // console.log(`ctx.req: ${ctx.req.sessionID}`);
    // console.log(`ctx.req: ${req.sessionID}`);
    // console.log(ctx.req.session.cookie);
    // console.log(`ctx:`);
    // console.log(ctx.req.cookies);
    // if (ctx.req.cookies && ctx.req.cookies['connect.sid']) {
    //   console.log(ctx.req.cookies['connect.sid']);
    // }

    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Session() session,
    @Context() ctx,
  ) {
    // session.views = (session.views || 0) + 1;
    // console.log(`findOne:`);
    // console.log(`session.views: ${session.views}`);
    // console.log(`ctx.req: ${ctx.req.sessionID}`);

    // console.log(`ctx.req.cookies:`);
    // console.log(ctx.req.cookies);
    // if (ctx.req.cookies && ctx.req.cookies['connect.sid']) {
    //   console.log(ctx.req.cookies['connect.sid']);
    // }

    return this.productService.findOne(id);
  }

  @Public()
  @Query(() => String)
  sayHello(@Session() session, @Context() ctx): string {
    // session.views = (session.views || 0) + 1;
    // console.log(`sayHello session.views: ${session.views}`);
    // console.log(`ctx.req: ${ctx.req.sessionID}`);

    // request.session.visits = request.session.visits
    //   ? request.session.visits + 1
    //   : 1;

    return 'Hello World!!';
  }

  // @Query(() => String)
  // sayHello(@Req() request: Request): string {
  //   console.log(`session: ${request.session}`);
  //   // request.session.visits = request.session.visits
  //   //   ? request.session.visits + 1
  //   //   : 1;
  //   return 'Hello World!!';
  // }

  // @Query(() => String)
  // sayHello(@Session() session: Record<string, any>): string {
  //   console.log(`session: ${session}`);
  //   // session.visits = session.visits ? session.visits + 1 : 1;
  //   // console.log(`session.visits: ${session.visits}`);
  //   return `Visits: ?`;
  // }
}
