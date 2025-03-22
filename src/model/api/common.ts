
export type UserFlag = "intro" | "disable_offramp" | "only_31" | "third_party" | "virtual_account" | "manual_submit_kyb";

export type SourceOfFunds = "salary" | "savings" | "lottery" | "investment" | "loan" | "business_income" | "others";

export type WalletAccountType = "web3_auth_copperx" | "safe" | "circle_dev" | "eoa" | "other" | "quantum";

export type TransferStatus = "pending" | "initiated" | "processing" | "success" | "canceled" | "failed" | "refunded";

export type HighRiskActivity = "marijuana_or_related_services" | "adult_entertainment" | "gambling" | "hold_client_funds" | "investment_services" | "lending_banking" | "money_services" | "operate_foreign_exchange_virtual_currencies_brokerage_otc" | "safe_deposit_box_rentals" | "third_party_payment_processing" | "weapons_firearms_and_explosives" | "none_of_the_above";

export type UBOType = "owner" | "signer" | "control";

export type TransferType = "send" | "receive" | "withdraw" | "deposit" | "bridge" | "bank_deposit";

export type UserRole = "owner" | "user" | "admin" | "member";

export type CustomerProfileType = "individual" | "business";

export type KybDocumentType = "certificate_of_incorporation" | "memorandum_of_association" | "articles_of_association" | "corporate_structure" | "director_structure" | "proof_of_address" | "authorization_document" | "other";

export type KycDocumentVerificationStatus = "pending" | "initiated" | "inprogress" | "review_pending" | "provider_manual_review" | "manual_review" | "provider_on_hold" | "review" | "on_hold" | "verified" | "rejected";

export type RecipientRelationship = "self" | "spouse" | "son" | "daughter" | "father" | "mother" | "other";

export type PurposeOfFund = "business_transactions" | "charitable_donations" | "investment_purposes" | "payments_to_friends_or_family_abroad" | "payroll" | "personal_or_living_expenses" | "protect_wealth" | "purchase_goods_and_services" | "receive_payments_for_goods_and_services" | "tax_optimization" | "other";

export type ChainId = "137" | "80002" | "1" | "11155111" | "42161" | "421614" | "8453" | "84532" | "10" | "11155420" | "56" | "97" | "1399811149" | "1399811150" | "23434" | "39361";

export interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ErrorDto = {
  message: Record<string, any>;
  statusCode: number;
  error: string;
};

export type SuccessDto = {
  message: string;
  statusCode: number;
};

export type PointsAccessDto = {
  token: string;
};

export type UserFlagDto = {
  flag: UserFlag;
};

export type PageDto = {
  page: number;
  limit: number;
  count: number;
  hasMore: boolean;
};

export type RecoverTokensDto = {
  organizationId: string;
  chainId: ChainId;
  amount: string;
  currency: Currency;
  toAccount?: string;
};

export type UserStatus = "pending" | "active" | "suspended";

export type CreateKycDetailDto = {
  nationality: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  sourceOfFund?: string;
  positionAtCompany?: string;
  uboType?: UBOType;
  percentageOfShares?: number;
  joiningDate?: string;
};

export type ProviderCode = "0x0" | "0x1" | "0x2" | "0x11" | "0x21" | "0x22" | "0x31" | "0x41" | "0x23" | "0x24" | "0xffff";

export type TransactionDto = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  type: string;
  providerCode: ProviderCode;
  kycId?: string;
  transferId?: string;
  status: string;
  externalStatus?: string;
  fromAccountId?: string;
  toAccountId?: string;
  fromAmount?: string;
  fromCurrency: Currency;
  toAmount?: string;
  toCurrency: Currency;
  totalFee?: string;
  feeCurrency: Currency;
  transactionHash?: string;
  depositAccount?: TransferAccountDto;
  externalTransactionId?: string;
  externalCustomerId?: string;
  depositUrl?: string;
};

export type TransferAccountDto = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  type: string;
  country?: Country;
  network?: string;
  accountId?: string;
  walletAddress?: string;
  bankName?: string;
  bankAddress?: string;
  bankRoutingNumber?: string;
  bankAccountNumber?: string;
  bankDepositMessage?: string;
  wireMessage?: string;
  payeeEmail?: string;
  payeeOrganizationId?: string;
  payeeId?: string;
  payeeDisplayName?: string;
};

export type UploadKybDocumentFormDto = {
  documentType: KybDocumentType;
};

export type Country = "usa" | "ind" | "are" | "idn" | "pak" | "sgp" | "esp" | "can" | "cym" | "lbn" | "mys" | "pan" | "tur" | "vct" | "vgb" | "vnm" | "bel" | "tha" | "hkg" | "aut" | "hrv" | "cyp" | "est" | "fin" | "fra" | "gre" | "irl" | "ita" | "lva" | "ltu" | "lux" | "mlt" | "nld" | "prt" | "svk" | "svn" | "deu" | "bgd" | "phl" | "khm" | "aus" | "gbr" | "npl" | "lka" | "ben" | "cmr" | "gha" | "ken" | "moz" | "sen" | "tza" | "uga" | "nzl" | "kor" | "mmr" | "jpn" | "bra" | "chn" | "none";

export type CustomerDataDto = {
  name?: string;
  businessName?: string;
  email?: string;
  country?: string;
};

export type BridgeTransferBalance = {
  chainId: ChainId;
  balance: string;
};

export type CustomerDto = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  businessName?: string;
  email?: string;
  country?: string;
};

export type NetworkDto = {
  id: string;
  name: string;
}

export type TransferMode = "on_ramp" | "off_ramp" | "remittance" | "on_chain";

export type Currency = "USD" | "INR" | "AED" | "IDR" | "PKR" | "SGD" | "EUR" | "MYR" | "CAD" | "KYD" | "LBP" | "TRY" | "XCD" | "VND" | "THB" | "HKD" | "BDT" | "PHP" | "KHR" | "AUD" | "GBP" | "NPR" | "LKR" | "XOF" | "XAF" | "GHS" | "KES" | "MZN" | "TZS" | "UGX" | "NZD" | "KRW" | "MMK" | "JPY" | "BRL" | "CNY" | "USDC" | "USDT" | "DAI" | "ETH" | "USDCE" | "STRK";

export type PurposeCode = "self" | "salary" | "gift" | "income" | "saving" | "education_support" | "family" | "home_improvement" | "reimbursement";