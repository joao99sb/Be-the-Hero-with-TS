import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import Ong from 'src/modules/ongs/entities/Ong';

@ObjectType()
@Entity('incidents')
export default class Incident {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  email: string;

  @ManyToOne(() => Ong, (ongs) => ongs.incidentsConnection)
  @JoinColumn({ name: 'ongs_id' })
  ongs: Ong;
}
