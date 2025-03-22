import { TransferService } from "./transfer.service";
import { WalletService } from "./wallet.service";

export interface PayoutService extends TransferService, WalletService {
    get auth(): string | undefined;
    authenticate(token: string | undefined): void;
}