import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'nestjs',
  type: process.env.DB_TYPE || 'postgres',
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.AUTO_LOAD === 'true' ? true : false,
}));
