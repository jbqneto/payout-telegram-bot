import { ApiResponse, NetworkDto } from "../model/api/common";
import { WalletBalanceDto, WalletDto } from "../model/api/wallet";

export interface WalletService {
    getWallets(): Promise<ApiResponse<WalletDto[]>>;
    getBalances(): Promise<ApiResponse<WalletBalanceDto[]>>;
    setDefaultWallet(walletId: string): Promise<ApiResponse<{ success: boolean }>>;
    getDefaultWallet(): Promise<ApiResponse<WalletDto>>;
    getNetworks(): Promise<ApiResponse<NetworkDto[]>>;
}