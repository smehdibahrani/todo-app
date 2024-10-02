import type { NestMiddleware } from '@nestjs/common';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../application/services/auth.service';
import { UserAppService } from '../../application/services/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(UserAppService)
    private readonly userAppService: UserAppService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;

      if (authorization) {
        const { username } = this.authService.verify(authorization);
        req['currentUser'] = await this.userAppService.getUser(username);
      } else {
        throw new UnauthorizedException({});
      }
      next();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(e);
    }
  }
}
