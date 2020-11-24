import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentsService } from './incidents.service';

import Incident from './entities/Incident';

const modules = [];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Incident]), ...modules],
  providers: [IncidentsService],
  exports: [IncidentsService],
})
export class IncidentssModule {}
