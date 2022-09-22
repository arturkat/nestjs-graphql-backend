import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('\n => Before: 0ms');

    const gqlCtx = GqlExecutionContext.create(ctx);
    const req = gqlCtx.getContext().req;
    // console.log(`req.cookies:`, req.cookies);

    const res = gqlCtx.getContext().res;
    // res.cookie('serverCookie', 'serverCookie');

    const session = req.session;
    if (session) {
      session.views = (session.views || 0) + 1;
      console.log(`session.views: ${session.views}`);
    }

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`=> After: ${Date.now() - now}ms`);
      }),
    );
  }
}
