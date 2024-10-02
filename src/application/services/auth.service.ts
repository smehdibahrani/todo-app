import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { EnvironmentConfigService } from '../config/environment_config.service';

const fs = require('fs');

export class AuthService {
  private jwtConfig: {
    secretKey: string;
    algorithm: any;
    accessTokenExpire: string;
    publicKey: string;
    privateKey: string;
  };

  constructor(
    @Inject(EnvironmentConfigService)
    private readonly configService: EnvironmentConfigService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {
    this.jwtConfig = this.configService.getJwtConfig();
  }

  verify(token: string): { username: string } {
    const publicKey = fs.readFileSync(this.jwtConfig.publicKey, 'utf8');
    return this.jwtService.verify(token, {
      publicKey: publicKey,
      algorithms: [this.jwtConfig.algorithm],
    });
  }

  sign(payload: any) {
    const privateKey = fs.readFileSync(this.jwtConfig.privateKey, 'utf8');
    return this.jwtService.sign(payload, {
      privateKey: privateKey,
      algorithm: this.jwtConfig.algorithm,
      expiresIn: this.jwtConfig.accessTokenExpire,
    });
  }
}
