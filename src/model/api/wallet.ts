import { BridgeTransferBalance, Currency, PurposeCode, WalletAccountType } from "./common";

export interface WalletDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  walletType: WalletAccountType;
  network?: string;
  walletAddress?: string;
  isDefault?: boolean;
}

export interface BalanceResponseDto {
  decimals: number;
  balance: string;
  symbol: string;
  address: string;
}

export interface WalletBalanceDto {
  walletId: string;
  isDefault: boolean;
  network: string;
  balances: BalanceResponseDto[];
}

export interface SetDefaultWalletDto {
  walletId: string;
}

export interface GenerateWalletDto {
  network: string;
}

export interface CreateWalletWithdrawTransferDto {
  walletAddress: string;
  amount: string;
  purposeCode: PurposeCode;
  currency?: Currency;
}

export interface BridgeTransferBalances {
  balances: BridgeTransferBalance[];
}