import { Controller, Get } from '@nestjs/common';
import { OngsService } from './modules/ongs/ong.service';

@Controller()
export class AppController {
  constructor(private readonly repoService: OngsService) {}

  @Get()
  async getHello(): Promise<string> {
    return ` the number is: ${await this.repoService.ongRepo.count()}`;
  }
}
