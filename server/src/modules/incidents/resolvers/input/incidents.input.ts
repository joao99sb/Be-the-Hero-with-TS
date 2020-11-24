import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IncidentsInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  value: string;
}
