import { z } from "zod";

export const UserSchema = z.object({
    email: z.string().email(),
});

export const OTPAuthSchema = z.object({
    email: z.string().email(),
    sid: z.string().nonempty(),
    otp: z.string().length(6),
});