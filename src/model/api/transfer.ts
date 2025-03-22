import { ChainId, Country, Currency, CustomerDataDto, CustomerDto, ErrorDto, PurposeCode, RecipientRelationship, SourceOfFunds, TransactionDto, TransferAccountDto, TransferMode, TransferStatus, TransferType } from "./common";
import { CreateWalletWithdrawTransferDto } from "./wallet";

export interface Transfer {
  id: string;
  type: 'EMAIL' | 'WALLET' | 'BANK';
  amount: string;
  amountUsd: string;
  token: string;
  network: string;
  status: TransferStatus;
  fromWallet: string;
  toAddress?: string;
  toEmail?: string;
  toBankAccount?: string;
  fee: string;
  feeUsd: string;
  memo?: string;
  createdAt: Date;
  completedAt?: Date;
  transactionHash?: string;
}

export type TransferBatchResponseDto = {
  requestId: string;
  request: CreateSendTransferDto;
  response: any;
  error?: ErrorDto;
};


export interface TransferWithTransactionsOnlyDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  status: TransferStatus;
  customerId?: string;
  customer?: CustomerDto;
  type: TransferType;
  sourceCountry: Country;
  destinationCountry: Country;
  destinationCurrency?: Currency;
  amount: string;
  currency: Currency;
  amountSubtotal?: string;
  totalFee?: string;
  feePercentage?: string;
  feeCurrency?: Currency;
  invoiceNumber?: string;
  invoiceUrl?: string;
  sourceOfFundsFile?: string;
  note?: string;
  purposeCode?: PurposeCode;
  sourceOfFunds?: SourceOfFunds;
  recipientRelationship?: RecipientRelationship;
  sourceAccountId?: string;
  destinationAccountId?: string;
  paymentUrl?: string;
  mode?: TransferMode;
  isThirdPartyPayment: boolean;
  transactions?: TransactionDto[];
  destinationAccount?: TransferAccountDto;
  sourceAccount?: TransferAccountDto;
  senderDisplayName?: string;
}

export interface CreateOfframpTransferDto {
  invoiceNumber?: string;
  invoiceUrl?: string;
  purposeCode?: PurposeCode;
  sourceOfFunds?: SourceOfFunds;
  recipientRelationship?: RecipientRelationship;
  quotePayload: string;
  quoteSignature: string;
  preferredWalletId?: string;
  customerData?: CustomerDataDto;
  sourceOfFundsFile?: string;
  note?: string;
}

export interface TransferWithAccountDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  status: TransferStatus;
  customerId?: string;
  customer?: CustomerDto;
  type: TransferType;
  sourceCountry: Country;
  destinationCountry: Country;
  destinationCurrency?: Currency;
  amount: string;
  currency: Currency;
  amountSubtotal?: string;
  totalFee?: string;
  feePercentage?: string;
  feeCurrency?: Currency;
  invoiceNumber?: string;
  invoiceUrl?: string;
  sourceOfFundsFile?: string;
  note?: string;
  purposeCode?: PurposeCode;
  sourceOfFunds?: SourceOfFunds;
  recipientRelationship?: RecipientRelationship;
  sourceAccountId?: string;
  destinationAccountId?: string;
  paymentUrl?: string;
  mode?: TransferMode;
  isThirdPartyPayment: boolean;
  sourceAccount?: TransferAccountDto;
  destinationAccount?: TransferAccountDto;
  senderDisplayName?: string;
}

export interface CreateOnrampTransferDto {
  invoiceNumber?: string;
  invoiceUrl?: string;
  purposeCode?: PurposeCode;
  sourceOfFunds?: SourceOfFunds;
  recipientRelationship?: RecipientRelationship;
  quotePayload: string;
  quoteSignature: string;
  preferredWalletId?: string;
  customerData?: CustomerDataDto;
}

export interface CreateSendTransferDto {
  walletAddress?: string;
  email?: string;
  payeeId?: string;
  amount: string;
  purposeCode: PurposeCode;
  currency?: Currency;
}

export interface CreateSendTransferBatchDto {
  requests: CreateSendTransferBatchSingleRequestDto[];
}

export interface CreateSendTransferBatchResponseDto {
  responses: TransferBatchResponseDto[];
}

export interface CreateSolanaDepositTransferDto {
  amount: string;
  sourceOfFunds?: SourceOfFunds;
  depositChainId?: number;
}

export interface CreateBridgeTransferDto {
  sourceNetwork: ChainId;
  amount: string;
  sourceOfFunds?: SourceOfFunds;
}

export interface TransferWithTransactionsDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  status: TransferStatus;
  customerId?: string;
  customer?: CustomerDto;
  type: TransferType;
  sourceCountry: Country;
  destinationCountry: Country;
  destinationCurrency?: Currency;
  amount: string;
  currency: Currency;
  amountSubtotal?: string;
  totalFee?: string;
  feePercentage?: string;
  feeCurrency?: Currency;
  invoiceNumber?: string;
  invoiceUrl?: string;
  sourceOfFundsFile?: string;
  note?: string;
  purposeCode?: PurposeCode;
  sourceOfFunds?: SourceOfFunds;
  recipientRelationship?: RecipientRelationship;
  sourceAccountId?: string;
  destinationAccountId?: string;
  paymentUrl?: string;
  mode?: TransferMode;
  isThirdPartyPayment: boolean;
  sourceAccount?: TransferAccountDto;
  destinationAccount?: TransferAccountDto;
  senderDisplayName?: string;
  transactions?: TransactionDto[];
}

export type EmailTransferRequest = CreateSendTransferDto;
export type WalletTransferRequest = CreateWalletWithdrawTransferDto;
export type BankWithdrawalRequest = CreateOfframpTransferDto;
export type BatchTransferRequest = CreateSendTransferBatchDto;
export type BatchTransferResult = CreateSendTransferBatchResponseDto;
export type TransferResult = TransferWithAccountDto;
export type BaseTransferRequest = CreateOnrampTransferDto;

export type FeeCalculation = {
  baseFee: string;
  networkFee: string;
  totalFee: string;
  totalFeeUsd: string;
  amountAfterFees: string;
}

export interface PaginatedTransfers {
  data: Transfer[];
  total: number;
  page: number;
  limit: number;
}

export type CreateSendTransferBatchSingleRequestDto = {
  requestId: string;
  request: CreateSendTransferDto;
};
