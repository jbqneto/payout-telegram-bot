import { TransferStatus } from "./common";
import { Transfer } from "./transfer";

export interface BaseTransferRequest {
    amount: string;
    token: string;
    network: string;
    fromWalletId?: string; // If not provided, use default wallet
    memo?: string;
}

export interface EmailTransferRequest extends BaseTransferRequest {
    recipientEmail: string;
}

export interface WalletTransferRequest extends BaseTransferRequest {
    recipientAddress: string;
}

export interface BankWithdrawalRequest extends BaseTransferRequest {
    bankAccountId: string;
}

export interface BatchTransferRequest {
    transfers: (EmailTransferRequest | WalletTransferRequest)[];
}

export interface TransferResult {
    transferId: string;
    status: TransferStatus;
    fee: string;
    feeUsd: string;
    estimatedCompletionTime?: Date;
    transactionHash?: string;
}

export interface BatchTransferResult {
    batchId: string;
    successCount: number;
    failureCount: number;
    transfers: {
        index: number;
        transferId?: string;
        status: TransferStatus;
        error?: string;
    }[];
}

export interface PaginatedTransfers {
    items: Transfer[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
