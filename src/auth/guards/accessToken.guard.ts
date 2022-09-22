import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    // check weather the query or mutation is decorated by my Public decorator. If so, it has custom prop isPublic attached to it
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(), // can use it on queries and mutations
      context.getClass(), // can use it on whole resolver
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context); // hits the accessToken strategy
  }
}
