import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Ong from './entities/Ong';

@Injectable()
export class OngsService {
  public constructor(
    @InjectRepository(Ong)
    public readonly ongRepo: Repository<Ong>,
  ) {}
}
