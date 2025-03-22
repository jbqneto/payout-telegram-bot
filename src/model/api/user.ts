
export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    organizationId: string;
    role: string
    status: string
    type: string
    relayerAddress: string;
    flags: string[];
    walletAddress: string;
    walletId: string;
    walletAccountType: string;
}

export type UserProfile = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    type: string;
    walletAccountType: string;
    flags: string[];
    relayerAddress: string;
    walletId: string;
    status: string;
    role: string;
    organizationId: string;
    walletAddress: string;
}