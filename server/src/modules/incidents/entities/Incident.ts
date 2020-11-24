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
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  value: string;

  @Field()
  @Column({ name: 'ong_id' })
  ongId: string;

  @Field(() => Ong)
  ong: Ong;

  @ManyToOne(() => Ong, (ongs) => ongs.incidentsConnection, { primary: true })
  @JoinColumn({ name: 'ong_id' })
  ongsConnection: Promise<Ong>;
}
