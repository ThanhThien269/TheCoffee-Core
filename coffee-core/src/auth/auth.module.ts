import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/stragies/local.strategy';
import { JwtStrategy } from './passport/stragies/jwt.strategy';
import refresh_jwtConfig from './configs/refresh_jwt.config';
import { RefreshJwtStrategy } from './passport/stragies/rf-jwt.strategy';
import jwtConfig from './configs/jwt.config';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    // JwtModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     global: true,
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED'),
    //     },
    //   }),

    //   inject: [ConfigService],
    // }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refresh_jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
