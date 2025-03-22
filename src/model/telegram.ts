import { AppContext } from "./session";

export type BotAction = {
    [key: string]: (ctx: AppContext) => Promise<void>;
}
