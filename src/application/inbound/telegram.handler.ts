import { Markup, Telegraf } from 'telegraf';
import { getNetworkName } from '../../common/util';
import { AppContext } from '../../model/session';
import { BotAction } from '../../model/telegram';
import { OTPAuthSchema, UserSchema } from '../../model/validation/schemmas';
import { AuthService } from '../../service/auth.service';
import { PayoutService } from '../../service/payout.service';

export class BotHandler {
    constructor(private readonly bot: Telegraf<AppContext>, private authService: AuthService, private payoutService: PayoutService) {
        this.setup();
    }

    private setup() {
        this.bot.on('message', async (ctx) => {
            ctx.session.name = ctx.message?.from.first_name ?? ctx.session.name;
            let command;

            console.log("Message: ", ctx.text);

            if (ctx.text?.startsWith('/')) {
                command = ctx.text.trim().replace('/', '');
            } else {
                command = ctx.session.stage;
            }

            const action = this.actions[command];

            if (action) {
                await action(ctx);
            } else {
                await ctx.reply(`❌ Invalid command. What do you mean by "${ctx.text}" ?`);
            }
        });

        this.bot.telegram.setMyCommands([
            { command: 'start', description: 'Start the bot' },
            { command: 'profile', description: 'View your profile data' },
            { command: 'wallet', description: 'View your default wallet info' },
            { command: 'wallets', description: 'View your linked wallets' },
            { command: 'balances', description: 'Send funds' },
            { command: 'history', description: 'View recent transactions' },
        ]);
    }

    private actions: BotAction = {
        start: async (ctx) => {
            ctx.reply(`👋 Hello ${ctx.session.name}! Welcome to Copperx Bot`);

            if (ctx.session.accessToken) {
                await this.replyAuthenticatedMenu(ctx);
            } else {
                ctx.session.stage = 'awaiting_email';
                await ctx.reply("To get started, please enter your email address below ⬇️");
            }
        },

        profile: async (ctx) => {
            await ctx.reply('📡 Fetching user data...');
            try {
                const response = await this.authService.getUserProfile(ctx.session.accessToken!);
                if (!response.data || response.status !== 200) {
                    ctx.reply('❌ Failed to fetch user profile.');

                    return;
                }

                const user = response.data;

                const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
                const status = user.status === 'active' ? '✅ Active' : '⚠️ Inactive';
                const walletType = user.walletAccountType === 'quantum' ? '🟣 Quantum' : '🟡 Standard';
                const flags = user.flags?.length ? user.flags.map(f => `• ${f}`).join('\n') : 'None';

                await ctx.reply(
                    `<b>👤 User Profile</b>\n\n` +
                    `${fullName ? `👤 <b>Name:</b> ${fullName}\n` : ''}` +
                    `📧 <b>Email:</b> ${user.email}\n` +
                    `🆔 <b>User ID:</b> <code>${user.id}</code>\n` +
                    `🔖 <b>Status:</b> ${status}\n` +
                    `<b>Role:</b> ${user.role}\n` +
                    `<b>Organization ID:</b> <code>${user.organizationId}</code>\n` +
                    `<b>Account Type:</b> ${user.type}\n\n` +
                    `💳 <b>Wallet:</b>\n` +
                    `• <b>ID:</b> <code>${user.walletId}</code>\n` +
                    `• <b>Address:</b> <code>${user.walletAddress}</code>\n` +
                    `• <b>Type:</b> ${walletType}\n\n` +
                    `• <b>Relayer Address:</b>\n<code>${user.relayerAddress}</code>\n\n` +
                    `• <b>Flags:</b>\n${flags}`,
                    { parse_mode: 'HTML' }
                );

            } catch (err: any) {
                await ctx.reply(`❌ Error fetching profile: ${err.error ?? err.message ?? 'Could not fetch data'}`);
            }
        },
        wallets: async (ctx) => {
            const response = await this.payoutService.getWallets();

            if (!response.data || response.status !== 200) {
                await ctx.reply('❌ Failed to fetch wallet details.');
                return;
            }

            const wallets = response.data;

            ctx.replyWithHTML(`<b>💼 Wallets Linked to Your Account:</b>`);

            let reply = ''

            for (const wallet of wallets) {
                const isDefault = wallet.isDefault ? '⭐ <b>Default Wallet</b>\n' : '';
                const type = wallet.walletType === 'quantum' ? '🟣 Quantum' : '🟡 Standard';
                const createdAt = new Date(wallet.createdAt!).toLocaleString();
                const updatedAt = new Date(wallet.updatedAt!).toLocaleString();
                const networkName = getNetworkName(wallet.network!);

                reply +=
                    `\n${isDefault}` +
                    `💼<b>ID:</b> <code>${wallet.id}</code>\n` +
                    `<b>Network:</b> ${networkName} (${wallet.network})\n` +
                    `<b>Type:</b> ${type}\n` +
                    `<b>Address:</b>\n<code>${wallet.walletAddress}</code>\n` +
                    `<b>Created:</b> ${createdAt}\n` +
                    `<b>Updated:</b> ${updatedAt}\n` +
                    '\n'

            }

            await ctx.replyWithHTML(reply);
        },

        balances: async (ctx) => {

        },

        history: async (ctx) => {

        },

        networks: async (ctx) => {
            const response = await this.payoutService.getNetworks();

            if (!response.data || response.status !== 200) {
                await ctx.reply('❌ Failed to fetch networks.');
                return;
            }

            const networks = response.data;

            await ctx.replyWithHTML(
                `🌐 <b>Networks</b>\n\n` +
                networks.map((network) => {
                    return `${network.name} (${network.id})`;
                }).join('\n')
            );
        },

        awaiting_email: async (ctx) => {
            const email = (ctx.text ?? '').trim().toLowerCase();
            try {
                const { email: validatedEmail } = UserSchema.parse({ email });
                ctx.session.email = validatedEmail;
                const response = await this.authService.requestEmailOtp(validatedEmail);
                ctx.session.stage = 'awaiting_otp';
                ctx.session.sid = response.data?.sid;

                await ctx.reply(
                    `📨 OTP Sent!\n\n✅ We've sent a one-time password to ${validatedEmail}. Please enter it below:`
                );
            } catch (error) {
                await ctx.reply(`❌ Invalid email. Please try again.`);
            }
        },

        awaiting_otp: async (ctx) => {
            const otp = (ctx.text ?? '').trim();
            try {
                const { email, sid } = ctx.session;
                const auth = OTPAuthSchema.parse({ email, sid, otp });
                const response = await this.authService.authenticateWithEmailOtp(auth.email, auth.sid, auth.otp);

                if (!response.data || response.status !== 200) {
                    ctx.reply('❌ OTP authentication failed. Please try again.');
                    return;
                }

                ctx.session.user = response.data.user;
                ctx.session.accessToken = response.data.accessToken;
                ctx.session.expireAt = response.data.expireAt;

                ctx.reply('🎉 Success! You are now authenticated with Copperx!');

                await this.replyAuthenticatedMenu(ctx);

            } catch (error) {
                ctx.reply('❌ Invalid OTP. Please try again.');
            }
        },

        login: async (ctx) => {
            ctx.session.stage = 'awaiting_email';
            await ctx.reply('📧 Please enter your email address:');
        },
    };

    private async replyAuthenticatedMenu(ctx: AppContext) {
        const user = ctx.session.user;

        await ctx.reply(
            `👤 <b>User Info</b>\n` +
            `📧 Email: ${user?.email}\n` +
            `🔖 Status: ${user?.status === 'active' ? '✅ Active' : '⚠️ Inactive'}\n` +
            `💰 Wallet ID: <code>${user?.walletId}</code>\n` +
            `🏦 Wallet Address: <code>${user?.walletAddress}</code>\n` +
            `📅 Session Expires: ${new Date(ctx.session.expireAt ?? new Date()).toLocaleString()}`,
            { parse_mode: 'HTML' }
        );

        await ctx.reply('🛠️ <b>What would you like to do next?</b> 👇', {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('👛 View Wallet', 'VIEW_WALLET'), Markup.button.callback('📊 Check Balances', 'CHECK_BALANCES')],
                [Markup.button.callback('📨 Send to Email', 'SEND_EMAIL'), Markup.button.callback('💳 Send to Wallet', 'SEND_WALLET')],
                [Markup.button.callback('🏦 Withdraw to Bank', 'WITHDRAW_BANK'), Markup.button.callback('📦 Batch Transfers', 'SEND_BATCH')],
                [Markup.button.callback('📜 Transaction History', 'VIEW_HISTORY'), Markup.button.callback('🔍 Transfer Details', 'TRANSFER_DETAILS')],
                [Markup.button.callback('📈 Calculate Fees', 'CALCULATE_FEES'), Markup.button.callback('⚙️ Account Settings', 'ACCOUNT_SETTINGS')],
                [Markup.button.callback('🚪 Logout', 'LOGOUT')]
            ])
        });
    }

    public launch() {
        this.bot.launch();
    }
}