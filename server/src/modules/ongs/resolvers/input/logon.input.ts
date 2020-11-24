import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LogonInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
