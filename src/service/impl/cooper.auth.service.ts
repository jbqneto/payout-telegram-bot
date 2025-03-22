import { buildResponse } from "../../common/util";
import { OtpAuthResponse } from "../../model/api/auth";
import { ApiResponse } from "../../model/api/common";
import { KycStatus } from "../../model/api/kyc";
import { UserProfile } from "../../model/api/user";
import { AuthService } from "../auth.service";
import { ApiService } from "./api.service";

export class CooperAuthService extends ApiService implements AuthService {

    async requestEmailOtp(email: string): Promise<ApiResponse<{ sid: string; }>> {
        const response = await this.client.post(`/auth/email-otp/request`, { email });

        return buildResponse(response);
    }

    async authenticateWithEmailOtp(email: string, sid: string, otp: string): Promise<ApiResponse<OtpAuthResponse>> {
        const response = await this.client.post(`/auth/email-otp/authenticate`, { email, sid, otp });

        return buildResponse(response);
    }

    async refreshSession(refreshToken: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string; }>> {
        const response = await this.client.post(`/auth/refresh`, { refreshToken });
        return buildResponse(response);
    }

    async getUserProfile(token: string): Promise<ApiResponse<UserProfile>> {
        this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await this.client.get(`/auth/me`);

        return buildResponse(response);
    }

    async getKycStatus(token: string): Promise<ApiResponse<KycStatus>> {
        this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await this.client.get(`/kycs`);

        return buildResponse(response);
    }

}