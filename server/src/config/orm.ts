import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve, join } from 'path';

const entitiesPath = resolve(__dirname, '..', 'modules', '**', 'entities', '*');
const migrationPath = resolve(
  __dirname,
  '..',
  'shared',
  'database',
  'typeorm',
  'migrations',
);

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/database.db',
  logging: true,
  entities: [entitiesPath],
  migrations: [join(migrationPath, '*')],
  cli: {
    migrationsDir: join(migrationPath),
  },
};
module.exports = options;
