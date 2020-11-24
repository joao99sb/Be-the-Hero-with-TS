import { Injectable } from '@nestjs/common';
import Ong from '../../entities/Ong';
import { OngsService } from '../../ong.service';
import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { OngInput } from '../../resolvers/input/ong.input';

@Injectable()
export class CreateOngService {
  constructor(private readonly ongRepository: OngsService) {}

  public async execute(input: OngInput): Promise<Ong> {
    const ongChecking = await this.ongRepository.ongRepo.findOne({
      where: { email: input.email },
    });

    if (ongChecking) {
      throw new Error('Email in use');
    }
    const hashedPassword = await hash(input.password, 10);
    const ongId = randomBytes(4).toString('hex');

    const ong = this.ongRepository.ongRepo.create({
      id: ongId,
      email: input.email,
      name: input.name,
      password: hashedPassword,
      whatsapp: input.whatsapp,
      uf: input.uf,
      city: input.city,
    });
    await this.ongRepository.ongRepo.save(ong);
    return ong;
  }
}
