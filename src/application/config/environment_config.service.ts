import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('port');
  }

  getMongoUrlConfig(): string {
    return this.configService.get<string>('mongo');
  }

  getJwtConfig(): any {
    return this.configService.get<any>('jwt');
  }
}
