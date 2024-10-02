import { existsSync } from 'fs';
import { join } from 'path';

function envDetector(): string | string[] {
  switch (process.env.NODE_ENV) {
    case 'development':
      return ['config/development.local.js', 'config/development.js'];

    case 'test':
      return ['config/test.local.js', 'config/test.js'];

    default:
      return ['config/test.local.js', 'config/development.js'];
  }
}

let configFilename: string | string[] = envDetector();

export default () => {
  if (configFilename instanceof Array)
    configFilename = existsSync(join('./', configFilename[0]))
      ? configFilename[0]
      : configFilename[1];
  const configData = require(`../../../${configFilename}`);
  return configData as Record<string, any>;
};
