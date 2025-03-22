import { SQLite } from "@telegraf/session/sqlite";
import { Context } from "telegraf";
import { ForceReply, InlineKeyboardMarkup, LinkPreviewOptions, Message, MessageEntity, ParseMode, ReplyKeyboardMarkup, ReplyKeyboardRemove, ReplyParameters } from "telegraf/typings/core/types/typegram";
import { FmtString } from "telegraf/typings/format";
import { User } from "./api/user";

export type CONVERSATION_STAGE = 'start' | 'awaiting_email' | 'awaiting_otp' | 'logged_in';

export type SessionData = {
    id: number;
    userId: number;
    name: string;
    rateLimit: number;
    user?: User;
    sid?: string;
    accessToken?: string;
    refreshToken?: string;
    expireAt?: string;
    email?: string;
    requestId?: string;
    stage: CONVERSATION_STAGE;
    lastActive: number;
}

export class AppContext extends Context {
    session: SessionData = {
        id: 0,
        userId: 0,
        rateLimit: 0,
        name: "user",
        stage: 'start',
        lastActive: Date.now()
    };

    reply(text: string | FmtString<string>, extra?: Omit<{ chat_id: number | string; message_thread_id?: number; text: string; parse_mode?: ParseMode; entities?: MessageEntity[]; link_preview_options?: LinkPreviewOptions; disable_notification?: boolean; protect_content?: boolean; reply_parameters?: ReplyParameters; reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; }, "text" | "chat_id"> | undefined): Promise<Message.TextMessage> {
        return super.reply(text, {
            parse_mode: 'Markdown',
            ...extra,
        });
    }
}

export function createSessionStore(filename: string) {
    return SQLite<SessionData>({
        filename,
    });
}