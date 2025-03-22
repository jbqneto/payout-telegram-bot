
import { OtpAuthResponse } from "../model/api/auth";
import { ApiResponse } from "../model/api/common";
import { KycStatus } from "../model/api/kyc";
import { UserProfile } from "../model/api/user";

export interface AuthService {
    requestEmailOtp(email: string): Promise<ApiResponse<{ sid: string }>>;
    authenticateWithEmailOtp(email: string, sid: string, otp: string): Promise<ApiResponse<OtpAuthResponse>>;
    refreshSession(refreshToken: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>>;
    getUserProfile(token: string): Promise<ApiResponse<UserProfile>>;
    getKycStatus(token: string): Promise<ApiResponse<KycStatus>>;
}