import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import Incidents from '../entities/Incident';
import { IncidentsInput } from './input/incidents.input';
import { IncidentsService } from '../incidents.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../services/auth/auth.guard';

interface ICtx {
  id: string;
  iat: number;
  exp: number;
}

@Resolver(() => Incidents)
export class Incidentsresolver {
  constructor(private RepoService: IncidentsService) {}

  @Mutation(() => Incidents)
  @UseGuards(new AuthGuard())
  public async createIncidents(
    @Context('user')
    ctx: ICtx,
    @Args('data')
    input: IncidentsInput,
  ): Promise<Incidents> {
    const { id } = ctx;

    const incident = this.RepoService.incidentRepo.create({
      title: input.title,
      description: input.description,
      value: input.title,
      ongId: id,
    });
    const incidentSaved = await this.RepoService.incidentRepo.save(incident);
    return incidentSaved;
  }

  @Mutation(() => Incidents)
  @UseGuards(new AuthGuard())
  public async deleteIncidents(
    @Context('user')
    ctx: ICtx,
    @Args('id') id: number,
  ): Promise<Incidents> {
    const incident = await this.RepoService.incidentRepo.findOne({
      where: { id },
    });

    if (incident.ongId != ctx.id) {
      throw new Error('you have no authorization to delete this incident');
    }
    const incidentRemoved = await this.RepoService.incidentRepo.remove(
      incident,
    );
    return incidentRemoved;
  }

  @Query(() => [Incidents])
  @UseGuards(new AuthGuard())
  public async getAllMessagesFromOng(
    @Context('user')
    ctx: ICtx,
  ): Promise<Incidents[]> {
    const { id } = ctx;
    const messages = await this.RepoService.incidentRepo.find({
      where: { ongId: id },
    });
    return messages;
  }

  @Query(() => [Incidents])
  public async admGetAllIncidents(): Promise<Incidents[]> {
    return await this.RepoService.incidentRepo.find();
  }
}
