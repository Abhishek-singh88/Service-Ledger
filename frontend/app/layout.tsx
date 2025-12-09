"use client";
import { WagmiProvider, createConfig, http } from 'wagmi';
import { arbitrumSepolia } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'LocalVouchers',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [arbitrumSepolia],
  transports: {
    [arbitrumSepolia.id]: http()
  }
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
                <a href="/" style={{ margin: '0 1rem' }}>Marketplace</a>
                <a href="/business/dashboard" style={{ margin: '0 1rem' }}>Business Dashboard</a>
                <a href="/my-vouchers" style={{ margin: '0 1rem' }}>My Vouchers</a>
              </nav>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
