import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
  secret: process.env.JWT_TOKEN_SECRET,
  expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRES_IN ?? '3600'),
  refreshTokenExpiresIn: parseInt(process.env.JWT_TOKEN_REFRESH_EXPIRES_IN ?? '86400'),
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
}));
