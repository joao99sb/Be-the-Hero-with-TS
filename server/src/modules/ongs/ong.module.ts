import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OngsService } from './ong.service';

import Ong from './entities/Ong';

import { AuthModule } from './services/auth/auth.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Ong]), AuthModule],
  providers: [OngsService],
  exports: [OngsService],
})
export class OngsModule {}
