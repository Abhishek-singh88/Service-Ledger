# Service Ledger – Local Business Vouchers on the Blockchain

Service Ledger is a decentralized marketplace where local businesses can create on-chain vouchers and customers can buy, hold, and redeem them using SLR tokens on Arbitrum Sepolia.  
It combines an ERC20 payment token with an ERC1155 voucher system, a business dashboard, and a consumer-friendly marketplace UI.

> this is a **testnet demo**, not a production deployment.

---

## Table of Contents

- [Live Links](#live-links)
- [Project Vision](#project-vision)
- [Core Features](#core-features)
- [Architecture](#architecture)
- [Smart Contracts](#smart-contracts)
- [Tech Stack](#tech-stack)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [How to Use](#how-to-use)
  - [1. Get Test SLR Tokens](#1-get-test-slr-tokens)
  - [2. Browse Marketplace](#2-browse-marketplace)
  - [3. Register a Business](#3-register-a-business)
  - [4. Create Vouchers](#4-create-vouchers)
  - [5. Buy Vouchers](#5-buy-vouchers)
  - [6. View & Redeem Vouchers](#6-view--redeem-vouchers)
- [Voucher Lifecycle](#voucher-lifecycle)
- [Development Notes](#development-notes)
- [Future Roadmap](#future-roadmap)
- [Known Limitations](#known-limitations)
- [License](#license)

---

## Live Links

- **Landing Page & dApp**: `https://service-ledger.vercel.app/`  
- **SLR Faucet**: `https://faucet-slr.vercel.app/`  
- **Network**: Arbitrum Sepolia Testnet  

---

## Project Vision

Local businesses often use paper coupons, PDF vouchers, or centralized platforms that:
- Are hard to track and easy to fake.
- Lock businesses into high-fee intermediaries.
- Do not let customers trade or transfer vouchers.

**Service Ledger** solves this by turning vouchers into ERC1155 tokens:
- Businesses mint vouchers on-chain and get paid in SLR(Service Ledger).
- Customers buy, hold, transfer, and redeem vouchers directly from their wallet.
- All operations are transparent and verifiable on the blockchain.

---

## Core Features

### For Customers

- **Marketplace Home**  
  - Browse all active vouchers dynamically.
  - See business name, city, description, price, remaining units, and **expiry date**.
- **SLR Token Integration**  
  - Pay for vouchers in SLR (ERC20).
- **My Vouchers Page**  
  - See all vouchers you own.
  - View business details, city, image, and **expiry state**:
    - "No expiry"
    - "Expires on …"
    - "Expired"
  - Redeem any quantity via `redeemSelf`.

### For Businesses

- **Business Registration**  
  - Connect wallet and register as a business on-chain.
  - Single on-chain registration per address.
- **Business Dashboard**  
  - Create new vouchers with:
    - Business Name
    - Voucher Title
    - Description
    - Image URL
    - City
    - Total Units (initial supply)
    - Price in SLR
    - Expiry:
      - No expiry, or
      - Quick presets (7 / 30 / 90 days, 1 year), or
      - Custom date via `datetime-local` → converted to Unix timestamp.
- **On-Chain Remaining Units**  
  - Remaining supply is derived from the business’ `balanceOf` for each voucher ID.

### UX & UI

- Dark theme with orange accent (consistent across Landing, Marketplace, My Vouchers, Business Dashboard).
- Navbar with:
  - Logo + brand name.
  - Links: Home, Marketplace, My Vouchers, Business.
  - **Get Faucet** button → SLR faucet.
  - RainbowKit **Connect Wallet** button.
- Landing page sections:
  - Hero + CTA (Browse Marketplace / Register Business).
  - Capability stats (no fake revenue).
  - Features, How It Works, Development Roadmap.
  - FAQ with collapsible Q&A.

---

## Architecture

### High-Level

- **Frontend**: Next.js App Router (TypeScript)
- **Wallet & Web3**: Wagmi v2 + RainbowKit + viem
- **Smart Contracts**: Solidity, OpenZeppelin (ERC20 + ERC1155)
- **Metadata Storage**: IPFS via an API route (`/api/uploadVoucherMetadata`)
- **Network**: Arbitrum Sepolia

### Directory Structure (simplified)
```bash
SERVICE-LEDGER/
│
├── contracts/                            # Smart contracts (Hardhat / Solidity)
│   └── LocalVouchers.sol                # ERC-based voucher contract (mint,transfer,redeem)
│
├── frontend/                             # Next.js frontend application
│   │
│   ├── app/                              # Next.js App Router (main application logic)
│   │   │
│   │   ├── api/                          # Server-side API routes (Next.js route handlers)
│   │   │   ├── getMaxVoucherId/          # Returns latest voucher ID from blockchain
│   │   │   │   └── route.ts
│   │   │   ├── getUserBalance/           # Fetches user voucher/token balance
│   │   │   │   └── route.ts
│   │   │   ├── getVoucher/               # Fetches voucher metadata by ID
│   │   │   │   └── route.ts
│   │   │   └── uploadVoucherMetadata/    # Uploads voucher metadata to IPFS (Pinata)
│   │   │       └── route.ts
│   │   │
│   │   ├── business/                     # Business-related routes
│   │   │   └── dashboard/                # Business dashboard(voucher creation & analytics)
│   │   │       └── page.tsx               # /business/dashboard page
│   │   │
│   │   ├── components/                   # Reusable UI components
│   │   │   ├── FAQ.tsx                   # Frequently Asked Questions section
│   │   │   └── Navbar.tsx                # Global navigation bar
│   │   │
│   │   ├── lib/                          # Shared utilities & blockchain helpers
│   │   │   ├── abis/                     # Contract ABIs (JSON)
│   │   │   │   └── LocalVouchers.json
│   │   │   └── contracts.ts              # Contract address, ethers/viem setup
│   │   │
│   │   ├── marketplace/                  # Public voucher marketplace
│   │   │   └── page.tsx                  # /marketplace page (browse & buy vouchers)
│   │   │
│   │   ├── my-vouchers/                  # User-owned vouchers
│   │   │   └── page.tsx                  # /my-vouchers page (owned & redeemable vouchers)
│   │   │
│   │   ├── layout.tsx                    # Root layout (Navbar, Footer, providers)
│   │   ├── page.tsx                      # Home page (/)
│   │   ├── globals.css                   # Global styles (Tailwind / custom CSS)
│   │   └── favicon.ico                   # App favicon
│   │
│   ├── public/                           # Static assets (images, icons, logos)
│   │
│   ├── .env.local                        # Environment variables (RPC, Pinata, keys)
│   ├── package.json                     # Frontend dependencies & scripts
│   └── next.config.ts                   # Next.js configuration
│
├── scripts
|    └── deploy.js                       # deployment of smart contracts
|
├── hardhat.config.js                     # configuration files
└── README.md                             # Project documentation

```

## Smart Contracts

> All contracts are deployed on **Arbitrum Sepolia**.

### 1. `SLR` – ERC20 Payment Token

- Standard ERC20 token used to pay for vouchers.
- Users must approve `LocalVouchers` to spend SLR once.
- Used in `buyVoucher(tokenId, amount)`.

### 2. `LocalVouchers` – ERC1155 Voucher Contract

- Each **voucher type** is an ERC1155 token ID.
- Core functions (names may differ if you changed them):


---

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Wallet / Web3**: Wagmi v2, RainbowKit, viem
- **Styling**: Inline styles / CSS-in-JS (no CSS framework to keep simple)
- **Storage**: IPFS for voucher metadata
- **Network**: Arbitrum Sepolia
- **Tooling**: pnpm / npm, GitHub

---

## Local Setup

### 1. Clone & Install

- git clone https://github.com/abhishek-singh88/service-ledger.git
- cd service-ledger

- pnpm (preferred)
```bash pnpm install ```

- or npm
```bash npm install ```


### 2. Configure Environment

Create `.env.local`:

- NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
- NEXT_PUBLIC_SLR_TOKEN_ADDRESS=0x...
- NEXT_PUBLIC_LOCAL_VOUCHERS_ADDRESS=0x...
- NEXT_PUBLIC_INFURA_KEY=your_infura_key # if you used Infura in wagmi config


> The contract addresses must match your **Arbitrum Sepolia** deployments.

### 3. Run Dev Server

```bash
pnpm dev
or
npm run dev
```
Open `http://localhost:3000`.

---


## How to Use

### 1. Get Test SLR Tokens

1. Connect your wallet on Arbitrum Sepolia.
2. Click **Get Faucet** in the navbar or open:  
   `https://faucet-slr.vercel.app/`
3. Request SLR tokens to your wallet address.

### 2. Browse Marketplace

- Open `/marketplace` or use the navbar link.
- The app:
  - Calls `/api/getMaxVoucherId` → reads `nextVoucherId` from contract.
  - Iterates from `1..maxVoucherId`.
  - For each ID calls `/api/getVoucher?tokenId=N` to fetch:
    - `business`, `price`, `expiry`, `active`, `uri`, `remainingUnits`.
  - Loads metadata from IPFS (`fetchMetadata`) for UI display.

You’ll see:
- Business name, city, image.
- Price per unit in SLR.
- Remaining units.
- Expiry status: No expiry / Expires on / Expired.

### 3. Register a Business

1. Navigate to `/business/dashboard`.
2. If wallet is **not connected**, you see a “Connect Wallet” card.
3. Once connected, if **not registered**, you see the “Register Your Business” card.
4. Click **Register Now**:
   - Triggers `registerBusiness("ipfs://business-metadata")`.
   - After confirmation, the UI refetches and shows the voucher creation form.

### 4. Create Vouchers

On the Business Dashboard:

- Fill:
  - Business Name
  - Voucher Title
  - Description
  - Image URL
  - City
  - Total Units (initial supply)
  - Price in SLR
  - Expiry:
    - Use quick presets (No Expiry, 7/30/90 days, 1 year), or
    - Use the date-time picker → converts to Unix timestamp.

Flow:
1. Form data is POSTed to `/api/uploadVoucherMetadata` which uploads JSON to IPFS and returns `uri`.
2. Frontend calls:
```bash
createVoucher(
price: bigint,
expiry: bigint, // 0 or Unix timestamp
initialSupply: bigint,
uri: string
)
```

3. After confirmation, the voucher appears in the Marketplace whenever:
   - `active == true`
   - `remainingUnits > 0`
   - Business address is not zero.

### 5. Buy Vouchers

On `/marketplace`:

1. Select a voucher card → shows quantity input + total cost.
2. Enter quantity (up to remaining units).
3. Click **Buy Now**.

The app:
- Checks SLR `allowance` for `LocalVouchers`.
- If insufficient:
  - Step 1: Sends `approve` with a large max allowance.
  - After approval Tx is confirmed, automatically:
  - Step 2: Sends `buyVoucher(tokenId, amount)`.
- UI shows:
  - **Step 1/2: Approving…**
  - **Step 2/2: Buying…**
- On success:
  - Shows success banner.
  - Refetches SLR balance and vouchers (remaining units update).

### 6. View & Redeem Vouchers

On `/my-vouchers`:

1. The app calls `/api/getMaxVoucherId` and loops through all token IDs.
2. For each `(address, tokenId)` it calls `/api/getUserBalance` to get:
   - `balance`, `uri`, `expiry`.
3. Vouchers where your `balance > 0` are displayed with:
   - Business name, city, description, image.
   - Your owned units.
   - Expiry (No expiry / Expires on / Expired).

Redeeming:
- Select a voucher card → shows quantity input and **Redeem Now** button.
- Calls:
```bash
redeemSelf(tokenId, amount)
```


- On success:
  - Reloads owned vouchers.
  - Resets selection and quantity.

---

## Voucher Lifecycle

1. **Business registers** via `registerBusiness`.
2. **Business mints voucher**:
   - `createVoucher(price, expiry, initialSupply, uri)`.
   - ERC1155 tokens are minted to `business` address.
3. **Customer buys voucher**:
   - Approves SLR once (if needed).
   - Calls `buyVoucher(tokenId, amount)`:
     - Transfers SLR from buyer to business.
     - Transfers ERC1155 from business to buyer.
4. **Customer redeems voucher**:
   - Calls `redeemSelf(tokenId, amount)`:
     - Burns customer’s ERC1155 tokens.
   - Off-chain, business honors the redemption.

---

## Development Notes

- RPC reliability improved using multiple transports + fallback in Wagmi config.
- Marketplace & My Vouchers **do not hardcode token IDs**:
  - Everything derives from `nextVoucherId` and per-ID API reads.
- Expiry handling:
  - Stored on-chain as Unix timestamp.
  - `0` means “no expiry”.
  - Frontend compares with `Date.now()/1000` to render status.
- Metadata:
  - Stored on IPFS with typical ERC1155-style JSON:
    - `name`, `description`, `image`, `attributes` (Business, City, etc.).

---

## Future Roadmap

Planned / nice-to-have features:

- **QR Code Redemption**  
  - Generate QR codes for each voucher → scanned by business POS.
- **On-chain or Off-chain Analytics**  
  - Volume, number of unique buyers, top businesses.
- **Multi-chain Support**  
  - Deploy on L2s / sidechains beyond Arbitrum.
- **Secondary Marketplace**  
  - Let users list and trade vouchers P2P.
- **Email / Push Notifications**  
  - Reminders before vouchers expire.

---

## Known Limitations

- Testnet-only (Arbitrum Sepolia); do not use with real funds.
- UI does not yet handle:
  - Partial failures of RPC providers beyond basic retries.
- Business registration uses a placeholder metadata URI (`ipfs://business-metadata`) – this can be extended with real business profiles.

---

## License

This project is provided for hackathon and educational use.  
If you want to reuse or extend it, add a license of your choice (e.g. MIT) here.
```bash
MIT License – Copyright (c) 2025 Abhishek singh
```




