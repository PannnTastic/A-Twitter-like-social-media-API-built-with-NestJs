import * as Joi from 'joi';

export default Joi.object({
    ENV_MODE: Joi.string().valid('development', 'production').default('development'),
    DB_TYPE: Joi.string().valid('postgres', 'mysql', 'sqlite').default('postgres'),
    DB_HOST: Joi.string().default('localhost'),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    JWT_TOKEN_SECRET: Joi.string().required(),
    JWT_TOKEN_EXPIRES_IN: Joi.number().required().default(3600),
    JWT_TOKEN_REFRESH_EXPIRES_IN: Joi.number().required().default(86400),
    JWT_TOKEN_AUDIENCE: Joi.string().required().default('localhost:3000'),
    JWT_TOKEN_ISSUER: Joi.string().required().default('localhost:3000'),
    DB_SYNC: Joi.boolean().default(true),
    AUTO_LOAD: Joi.boolean().default(true),
})