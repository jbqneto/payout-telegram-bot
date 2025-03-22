import { buildResponse, getNetworkName } from "../../common/util";
import * as Api from "../../model/api";
import { ApiResponse, NetworkDto } from "../../model/api/common";
import { WalletBalanceDto, WalletDto } from "../../model/api/wallet";
import { PayoutService } from "../payout.service";
import { ApiService } from "./api.service";


export class CooperService extends ApiService implements PayoutService {
    private token: string | undefined;

    get auth(): string | undefined {
        return this.token;
    }
    authenticate(token: string | undefined): void {
        this.token = token;

        if (token) {
            this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete this.client.defaults.headers.common["Authorization"];
        }
    }

    async getWallets(): Promise<ApiResponse<WalletDto[]>> {
        const response = await this.client.get(`/wallets`);

        return buildResponse(response);
    }

    async getBalances(): Promise<ApiResponse<WalletBalanceDto[]>> {
        const response = await this.client.get(`/wallets/balances`);
        return buildResponse(response);
    }

    async setDefaultWallet(walletId: string): Promise<ApiResponse<{ success: boolean; }>> {
        const response = await this.client.post(`/wallets/default`, { walletId });
        return buildResponse(response);
    }

    async getDefaultWallet(): Promise<ApiResponse<WalletDto>> {
        const response = await this.client.get(`/wallets/default`);
        return buildResponse(response);
    }

    async sendToEmail(transferData: Api.EmailTransferRequest): Promise<ApiResponse<Api.TransferResult>> {
        const response = await this.client.post(`/transfers/send`, transferData);
        return buildResponse(response);
    }

    async sendToWallet(transferData: Api.WalletTransferRequest): Promise<ApiResponse<Api.TransferResult>> {
        const response = await this.client.post(`/transfers/wallet-withdraw`, transferData);
        return buildResponse(response);;
    }

    async withdrawToBank(withdrawalData: Api.BankWithdrawalRequest): Promise<ApiResponse<Api.TransferResult>> {
        const response = await this.client.post(`/transfers/offramp`, withdrawalData);
        return buildResponse(response);
    }

    async sendBatchTransfers(batchData: Api.BatchTransferRequest): Promise<ApiResponse<Api.BatchTransferResult>> {
        const response = await this.client.post(`/transfers/send-batch`, batchData);
        return buildResponse(response);
    }

    async getTransfers(page: number = 1, limit: number = 10): Promise<ApiResponse<Api.PaginatedTransfers>> {
        const response = await this.client.get(`/transfers?page=${page}&limit=${limit}`);
        return buildResponse(response);;
    }

    async getTransferById(transferId: string): Promise<ApiResponse<Api.TransferResult>> {
        const response = await this.client.get(`/transfers/${transferId}`);
        return buildResponse(response);;
    }

    async getNetworks(): Promise<ApiResponse<NetworkDto[]>> {
        const response = await this.client.get(`/wallets/networks`);

        const networks: NetworkDto[] = response.data.map((network: any) => ({
            id: network,
            name: getNetworkName(network)
        }));

        return {
            status: response.status,
            data: networks
        }
    }

}