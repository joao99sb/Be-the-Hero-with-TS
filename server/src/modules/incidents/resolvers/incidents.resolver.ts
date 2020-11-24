import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import Incidents from '../entities/Incident';

@Resolver(() => Incidents)
export class Incidentsresolver {
  @Mutation(() => [Incidents])
  public async createIncidents(): Promise<void> {}
}
