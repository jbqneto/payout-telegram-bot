import {
  CreateKycDetailDto,
  CustomerProfileType,
  HighRiskActivity,
  KybDocumentType,
  KycDocumentVerificationStatus,
  ProviderCode,
  PurposeOfFund,
  UBOType,
  UploadKybDocumentFormDto
} from "./common";

export type KycSourceOfFund = "business_revenue" | "investment_income" | "grants_and_subsidies" | "savings" | "business_loans" | "equity_funding" | "grants" | "investment_proceeds" | "legal_settlement_tax_refund" | "pension_retirement" | "sale_of_assets" | "third_party_funds" | "other";

export type KycStatus = "pending" | "initiated" | "inprogress" | "review_pending" | "review" | "provider_manual_review" | "manual_review" | "provider_on_hold" | "on_hold" | "expired" | "approved" | "rejected";

export type KycProviderCode = "sumsub" | "sumsub_uae" | "sumsub_global" | "hyperverge_ind" | "persona" | "manual";


export type KycAdditionalDocumentDto = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  kycId: string;
  name: string;
  fileName?: string;
};


export type CreateKybDetailDto = {
  companyName: string;
  companyDescription: string;
  website: string;
  incorporationDate: string;
  incorporationCountry: string;
  incorporationNumber: string;
  companyType: string;
  companyTypeOther?: string;
  taxIdentificationNumber?: string;
  natureOfBusiness: string;
  natureOfBusinessOther?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
};

export type UpdateKycDetailDto = {
  nationality?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  sourceOfFund?: string;
  positionAtCompany?: string;
};

export type CreateKycDto = {
  type: CustomerProfileType;
  country: string;
  kycDetail?: CreateKycDetailDto;
  kybDetail?: CreateKybDetailDto;
};

export type KycVerificationDto = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  kycDetailId: string;
  kycProviderCode: KycProviderCode;
  externalCustomerId?: string;
  externalKycId?: string;
  status: KycStatus;
  externalStatus?: string;
  verifiedAt?: string;
};

export interface KycDetailDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  kybDetailId?: string;
  nationality?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  positionAtCompany?: string;
  sourceOfFund?: string;
  currentKycVerificationId?: string;
  currentKycVerification?: KycVerificationDto;
  kycDocuments?: KycDocumentDto[];
  kycUrl?: string;
  uboType: UBOType;
  percentageOfShares: number;
  joiningDate: string;
}

export interface KybDocumentDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  kybDetailId: string;
  documentType: KybDocumentType;
  status?: KycDocumentVerificationStatus;
  frontFileName?: string;
  backFileName?: string;
}

export interface KybDetailDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  companyName?: string;
  companyDescription?: string;
  website?: string;
  incorporationDate?: string;
  incorporationCountry?: string;
  incorporationNumber?: string;
  companyType?: string;
  companyTypeOther?: string;
  natureOfBusiness?: string;
  natureOfBusinessOther?: string;
  sourceOfFund?: string;
  sourceOfFundOther?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state: string;
  postalCode?: string;
  country?: string;
  email?: string;
  phoneNumber?: string;
  currentKybVerificationId?: string;
  currentKybVerification?: KybVerificationDto;
  kybDocuments?: KybDocumentDto[];
  kycDetails?: KycDetailDto[];
  sourceOfFundDescription?: string;
  expectedMonthlyVolume?: number;
  purposeOfFund?: PurposeOfFund;
  purposeOfFundOther?: string;
  operatesInProhibitedCountries?: boolean;
  taxIdentificationNumber?: string;
  highRiskActivities?: HighRiskActivity[];
}

export interface KycDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  status: KycStatus;
  type: CustomerProfileType;
  country?: string;
  providerCode: ProviderCode;
  kycProviderCode?: KycProviderCode;
  kycDetailId?: string;
  kybDetailId?: string;
  kycDetail?: KycDetailDto;
  kybDetail?: KybDetailDto;
  kycAdditionalDocuments?: KycAdditionalDocumentDto[];
  statusUpdates?: string;
}

export interface KycUrlDto {
  kycDetailId: string;
  kycUrl: string;
  kycStatus: KycStatus;
  firstName: string;
  lastName?: string;
  kycProviderCode: KycProviderCode;
}

export interface CreateKycWithFileDto {
  form: CreateKycDto;
  panCardImage?: string;
}

export interface KybAdditionalInfoDto {
  sourceOfFund: KycSourceOfFund;
  sourceOfFundOther?: string;
  purposeOfFund: PurposeOfFund;
  purposeOfFundOther?: string;
  operatesInProhibitedCountries: boolean;
  sourceOfFundDescription?: string;
  expectedMonthlyVolume: number;
}

export interface UploadKybDocumentDto {
  form: UploadKybDocumentFormDto;
  file: string;
}

export interface CreateKycDetailWithFileDto {
  form: CreateKycDetailDto;
  panCardImage?: string;
}

export interface UpdateKycDetailWithFileDto {
  form?: UpdateKycDetailDto;
  panCardImage?: string;
}

export interface UpdateKycDto {
  country?: string;
  kybDetail?: CreateKybDetailDto;
}

export interface StateResponseDto {
  code: string;
  name: string;
}


export type KybVerificationDto = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  kybDetailId: string;
  kybProviderCode: KycProviderCode;
  externalCustomerId?: string;
  externalKybId?: string;
  status: KycStatus;
  externalStatus?: string;
  verifiedAt?: string;
};

export type KycDocumentDto = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId: string;
  kycDetailId: string;
  documentType: string;
  status?: KycDocumentVerificationStatus;
  frontFileName?: string;
  backFileName?: string;
};
