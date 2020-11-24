import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { OngsService } from '../ong.service';
import Ong from '../entities/Ong';
import OngInput from './input/ong.input';

import LogonInput from './input/logon.input';
import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { UseGuards } from '@nestjs/common';

import { LocalStrategy } from '../services/auth/local.strategy';
import { ILogonReturn } from './dtos/ILogonReturnDTO';
import { AuthService } from '../services/auth/auth.service';
import Session from '../entities/Session';
import { AuthGuard } from '../services/auth/auth.guard';

@Resolver(() => Ong)
class OngResolver {
  constructor(
    private readonly repoService: OngsService,

    private readonly localStrategyService: LocalStrategy,

    private readonly authService: AuthService,
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
    const ongChecking = await this.repoService.ongRepo.findOne({
      where: { email: intput.email },
    });

    if (ongChecking) {
      throw new Error('Email in use');
    }
    const hashedPassword = await hash(intput.password, 10);
    const ongId = randomBytes(4).toString('hex');

    const ong = this.repoService.ongRepo.create({
      id: ongId,
      email: intput.email,
      name: intput.name,
      password: hashedPassword,
      whatsapp: intput.whatsapp,
      uf: intput.uf,
      city: intput.city,
    });
    await this.repoService.ongRepo.save(ong);
    return ong;
  }

  @Query(() => Session)
  public async logon(@Args('data') input: LogonInput): Promise<ILogonReturn> {
    const ong = await this.localStrategyService.validate(
      input.email,
      input.password,
    );

    if (!ong) {
      throw new Error("ong doen't exist");
    }
    const { access_token } = await this.authService.login(ong.id);
    return {
      ong: ong,
      token: access_token,
    };
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
