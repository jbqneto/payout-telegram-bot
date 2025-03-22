# Telegram Bot for Copperx Payout

A Telegram bot built with TypeScript/Node.js using the telegraf library. This bot allows users to deposit, withdraw, and transfer USDC directly through Telegram by integrating with Copperx Payout's API.

---

## Overview

This project connects with Copperx Payout's API (see [API Documentation](https://income-api.copperx.io/api/doc)) to provide a Telegram interface for:

- **Authentication & Account Management:** Users log in via email OTP, view their profile, and check KYC/KYB status.
- **Wallet Management:** View wallet balances, set default wallets, and check transaction history.
- **Fund Transfers:** Send funds via email or wallet, withdraw to bank accounts, and review recent transactions.
- **Deposit Notifications:** Receive real-time deposit alerts through Pusher.
- **Bot Interaction:** Use commands like `/balance`, `/send`, and `/withdraw`, with interactive menus and inline keyboards.

---

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/telegram-copperx-bot.git
   cd telegram-copperx-bot
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the project root with your configuration settings. For example:

   ```dotenv
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   COPPERX_API_BASE_URL=https://income-api.copperx.io
   COPPERX_API_KEY=your_copperx_api_key
   PUSHER_KEY=your_pusher_key
   PUSHER_CLUSTER=your_pusher_cluster
   SESSION_SECRET=your_session_secret
   ```

4. **Development Mode:**

   For live reload during development:

   ```bash
   npm run dev
   ```

---


## Troubleshooting

- **Authentication Issues:** Verify your API credentials and session tokens.
- **Command Errors:** Check the bot logs for error details.
- **Pusher Notifications:** Ensure your Pusher settings in the `.env` file are correct.

---

