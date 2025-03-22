
import * as Api from "../model/api";
import { ApiResponse } from "../model/api/common";

export interface TransferService {
  sendToEmail(transferData: Api.EmailTransferRequest): Promise<ApiResponse<Api.TransferResult>>;
  sendToWallet(transferData: Api.WalletTransferRequest): Promise<ApiResponse<Api.TransferResult>>;
  withdrawToBank(withdrawalData: Api.BankWithdrawalRequest): Promise<ApiResponse<Api.TransferResult>>;
  sendBatchTransfers(batchData: Api.BatchTransferRequest): Promise<ApiResponse<Api.BatchTransferResult>>;
  getTransfers(page?: number, limit?: number): Promise<ApiResponse<Api.PaginatedTransfers>>;
  getTransferById(transferId: string): Promise<ApiResponse<Api.TransferResult>>;
}