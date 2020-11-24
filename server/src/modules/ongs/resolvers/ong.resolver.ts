import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { OngsService } from '../ong.service';
import Ong from '../entities/Ong';
import { OngInput } from './input/ong.input';
import { LogonInput } from './input/logon.input';
import { UseGuards } from '@nestjs/common';
import { ILogonReturn } from './dtos/ILogonReturnDTO';
import { Session } from '../entities/Session';
import { AuthGuard } from '../services/auth/auth.guard';
import { CreateOngService } from '../services/createOng/createOng.service';
import { LogonService } from '../services/logon/logon.service';

@Resolver(() => Ong)
class OngResolver {
  constructor(
    private readonly repoService: OngsService,
    private readonly createOngService: CreateOngService,
    private readonly logonService: LogonService,
  ) {}

  @Query(() => [Ong])
  public async getAllOngs(): Promise<Ong[]> {
    return this.repoService.ongRepo.find();
  }

  @Query(() => Ong)
  public async getOng(@Args('email') email: string) {
    const ong = await this.repoService.ongRepo.findOne({
      where: { email },
    });

    if (!ong) {
      throw new Error("Ong doesn't not exist!");
    }

    return ong;
  }

  @Mutation(() => Ong)
  public async createOng(@Args('data') intput: OngInput): Promise<Ong> {
    const ong = await this.createOngService.execute(intput);
    return ong;
  }

  @Query(() => Session)
  public async logon(@Args('data') input: LogonInput): Promise<ILogonReturn> {
    const ongAndToken = await this.logonService.execute(input);
    return ongAndToken;
  }

  @Query(() => Ong)
  @UseGuards(new AuthGuard())
  public async me(@Context('user') ong: Ong): Promise<Ong> {
    return ong;
  }

  @Mutation(() => Ong)
  public async deleteOng(@Args('id') id: number): Promise<Ong> {
    const ong = await this.repoService.ongRepo.findOne(id);

    if (!ong) {
      throw new Error('Ong do not ');
    }
    await this.repoService.ongRepo.remove(ong);

    return ong;
  }
}
export default OngResolver;
