import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { CreateSessionResponse } from './dto/create-session.response';
import { CreateSessionInput } from './dto/create-session.input';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreateSessionResponse)
  createCheckoutSession(
    @Args({ name: 'items', type: () => [CreateSessionInput] })
    createSessionInput: CreateSessionInput[],
  ) {
    return this.paymentService.createCheckoutSession(createSessionInput);
  }
}
