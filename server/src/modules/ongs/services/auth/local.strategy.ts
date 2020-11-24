import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import Ong from '../../entities/Ong';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<Ong> {
    const ong = await this.authService.validateOng(email, password);
    if (!ong) {
      throw new UnauthorizedException();
    }
    return ong;
  }
}
