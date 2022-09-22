import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRefreshToken } from '../types/index.type';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;
    if (data) return req.user[data];

    return req.user; // we have the user object here because of the strategies
  },
);
