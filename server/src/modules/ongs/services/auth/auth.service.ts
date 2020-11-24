import { Injectable } from '@nestjs/common';
import { OngsService } from '../../ong.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import Ong from '../../entities/Ong';

@Injectable()
export class AuthService {
  constructor(
    private ongsService: OngsService,
    private jwtService: JwtService,
  ) {}

  public async validateOng(
    email: string,
    password: string,
  ): Promise<Ong | null> {
    const ong = await this.ongsService.ongRepo.findOne({
      where: { email },
    });
    const passCompared = await compare(password, ong.password);

    if (ong && passCompared) {
      return ong;
    }
    return null;
  }
  public async login(ongId: string) {
    const payload = { id: ongId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
