import { ObjectType, Field } from '@nestjs/graphql';

import Ong from '../../entities/Ong';

@ObjectType()
export class Session {
  @Field()
  ong: Ong;

  @Field()
  token: string;
}
