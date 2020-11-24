import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OngsService } from './ong.service';

import Ong from './entities/Ong';

import { AuthModule } from './services/auth/auth.module';
import { createOngModule } from './services/createOng/createOng.module';
import { logonModule } from './services/logon/logon.module';

const modules = [AuthModule, createOngModule, logonModule];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Ong]), ...modules],
  providers: [OngsService],
  exports: [OngsService],
})
export class OngsModule {}
