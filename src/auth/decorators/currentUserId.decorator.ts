import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types/index.type';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;
    const user = req.user as JwtPayload; // we have the user object here because of the strategies
    return user.userId;
  },
);
