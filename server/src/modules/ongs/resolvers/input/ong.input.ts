import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OngInput {
  @Field()
  readonly name: string;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field()
  readonly whatsapp: string;

  @Field()
  readonly city: string;

  @Field()
  readonly uf: string;
}
