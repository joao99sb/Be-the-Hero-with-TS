import { Module, forwardRef, Global } from '@nestjs/common';
import { OngsModule } from '../../ong.module';

import { CreateOngService } from './createOng.service';

@Global()
@Module({
  imports: [forwardRef(() => OngsModule)],
  providers: [CreateOngService],
  exports: [CreateOngService],
})
export class createOngModule {}
