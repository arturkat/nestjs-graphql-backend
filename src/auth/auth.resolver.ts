import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signUp.input';
import { SignResponse } from './dto/sign.response';
import { SignInInput } from './dto/signIn.input';
import { LogOutResponse } from './dto/logOut.response';
import { Public } from './decorators/public.decorator';
import { NewTokensResponse } from './dto/newTokens.response';
import { CurrentUserId } from './decorators/currentUserId.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@src/auth/guards/accessToken.guard';
import { CheckAuthResponse } from '@src/auth/dto/checkAuth.response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Public()
  @Mutation(() => SignResponse)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Public()
  @Mutation(() => LogOutResponse)
  logOut(@Args('id', { type: () => Int }) id: number) {
    return this.authService.logOut(id);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => NewTokensResponse)
  getNewTokens(
    @CurrentUserId() userId: number,
    @CurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.getNewTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => CheckAuthResponse)
  checkAuth() {
    return {
      loggedIn: true,
    };
  }
}
