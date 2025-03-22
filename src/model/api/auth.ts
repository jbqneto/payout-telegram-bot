import { CustomerProfileType, UserRole, UserStatus } from "./common";
import { User } from "./user";

export interface LoginEmailOtpRequestDto {
  email: string;
}

export interface LoginEmailOtpResponseDto {
  email: string;
  sid: string;
}

export interface VerifyEmailOtpRequestDto {
  email: string;
  otp: string;
  sid: string;
}

export interface AuthUserDto {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage?: string;
  organizationId?: string;
  role: UserRole;
  status: UserStatus;
  type: CustomerProfileType;
  relayerAddress: string;
  flags?: string[];
  walletAddress?: string;
  walletId?: string;
  walletAccountType?: string;
}

export interface AuthenticateResponseDto {
  scheme: string;
  accessToken: string;
  accessTokenId: string;
  expireAt: string;
  user: any;
}

export interface Web3AuthAuthenticateDto {
  token: string;
  walletAddress?: string;
}


export type OtpAuthResponse = {
  accessToken: string;
  expireAt: string;
  user: User;
}