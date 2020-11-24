import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from 'src/config/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext<Request>();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization);
    return true;
  }
  public async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    console.log(token);
    try {
      return await verify(token, jwtSecret);
    } catch (error) {
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
