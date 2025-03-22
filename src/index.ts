import dotenv from 'dotenv';
import { session, Telegraf } from 'telegraf';
import { BotHandler } from './application/inbound/telegram.handler';
import { AppContext, createSessionStore } from './model/session';
import { AuthService } from './service/auth.service';
import { CooperAuthService } from './service/impl/cooper.auth.service';
import { CooperService } from './service/impl/cooper.service';
import { PayoutService } from './service/payout.service';

dotenv.config();

const store = createSessionStore(process.env.SESSION_STORAGE!);

const payoutService: PayoutService = new CooperService(process.env.API_BASE_URL!);
const authService: AuthService = new CooperAuthService(process.env.API_BASE_URL!);

const sessionMiddleWare = (ctx: AppContext, next: () => Promise<void>) => {
    const rateLimit = ctx.session?.rateLimit ?? 0;
    const originalSession = ctx.session;
    let stage = originalSession.stage;

    if (ctx.session.accessToken && ctx.session.expireAt) {

        const date = new Date(ctx.session.expireAt);
        const now = new Date();

        if (date < now) {
            ctx.session.accessToken = undefined;
            ctx.session.expireAt = undefined;
            ctx.session.refreshToken = undefined;
            ctx.session.stage = 'start';
        } else {
            stage = 'logged_in';
        }

    } else if (ctx.session.lastActive + 1000 * 60 * 60 < Date.now()) {
        ctx.session.rateLimit = 0;
        stage = 'start';
    }

    ctx.session = {
        ...originalSession,
        stage,
        id: ctx.message?.from.id ?? originalSession.id,
        userId: ctx.message?.from.id ?? originalSession.userId,
        name: ctx.message?.from.first_name ?? originalSession.name,
        lastActive: Date.now(),
        rateLimit: rateLimit + 1
    };

    console.log("\n--------- middleWare DEBUG: -----------\n");
    console.log("Session: ", ctx.session);
    console.log("Text: ", ctx.text);
    console.log("Stage: ", ctx.session.stage);
    console.log("\n------ End of middleWare DEBUG: ------\n");

    payoutService.authenticate(ctx.session.accessToken);

    return next();
};

const bot = new Telegraf<AppContext>(process.env.TELEGRAM_BOT_TOKEN!);
bot.use(session({ store }));
bot.use(sessionMiddleWare);

new BotHandler(bot, authService, payoutService).launch();