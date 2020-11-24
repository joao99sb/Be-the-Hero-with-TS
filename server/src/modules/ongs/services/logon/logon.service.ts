import { Injectable } from '@nestjs/common';
import { LogonInput } from '../../resolvers/input/logon.input';
import { LocalStrategy } from '../auth/local.strategy';
import { AuthService } from '../auth/auth.service';
import { ILogonReturn } from '../../resolvers/dtos/ILogonReturnDTO';

@Injectable()
export class LogonService {
  constructor(
    private readonly localStrategyService: LocalStrategy,

    private readonly authService: AuthService,
  ) {}

  public async execute(input: LogonInput): Promise<ILogonReturn> {
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
}
