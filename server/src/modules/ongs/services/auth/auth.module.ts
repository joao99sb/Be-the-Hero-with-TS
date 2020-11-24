import { Module, forwardRef, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OngsModule } from '../../ong.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/config/jwt';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    forwardRef(() => OngsModule),
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy],
})
export class AuthModule {}
