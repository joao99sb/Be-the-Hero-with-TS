import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Incident from './entities/Incident';

@Injectable()
export class IncidentsService {
  public constructor(
    @InjectRepository(Incident)
    public readonly incidentRepo: Repository<Incident>,
  ) {}
}
