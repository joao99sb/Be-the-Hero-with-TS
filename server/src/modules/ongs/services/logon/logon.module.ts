import { Module, forwardRef, Global } from '@nestjs/common';
import { OngsModule } from '../../ong.module';

import { LogonService } from './logon.service';

@Global()
@Module({
  imports: [forwardRef(() => OngsModule)],
  providers: [LogonService],
  exports: [LogonService],
})
export class logonModule {}
