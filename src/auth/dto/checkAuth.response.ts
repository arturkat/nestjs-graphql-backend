import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckAuthResponse {
  @Field()
  loggedIn: boolean;
}
