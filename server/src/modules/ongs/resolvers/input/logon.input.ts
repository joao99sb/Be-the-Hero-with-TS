import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class LogonInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
