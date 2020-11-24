import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import Incident from '../../incidents/entities/Incident';

@ObjectType()
@Entity({ name: 'ongs' })
export default class Ong {
  @PrimaryColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  whatsapp: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  uf: string;

  @OneToMany(() => Incident, (incidents) => incidents.ongsConnection)
  incidentsConnection: Promise<Incident[]>;
}
