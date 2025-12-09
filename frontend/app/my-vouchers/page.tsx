"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { CONTRACTS } from '../lib/contracts';
import { useState } from 'react';

export default function MyVouchers() {
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState('1');

  const { writeContract: writeContractFn } = useWriteContract();

  // Read voucher balance
  const { data: balance } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(tokenId)] : undefined
  });

  // Redeem voucher
  const handleRedeem = () => {
    writeContractFn({
      ...CONTRACTS.localVouchers,
      functionName: 'redeemSelf',
      args: [BigInt(tokenId), BigInt(1)]
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Vouchers</h1>
      <ConnectButton />

      <div style={{ marginTop: '2rem' }}>
        <h2>Check & Redeem Voucher</h2>
        <input
          type="number"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          style={{ padding: '0.5rem', margin: '0.5rem' }}
        />
        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
          Balance: <strong>{balance?.toString() || '0'}</strong>
        </p>
        <button 
          onClick={handleRedeem} 
          style={{ padding: '0.5rem 1rem' }}
          disabled={!balance || balance === BigInt(0)}
        >
          Redeem 1 Voucher
        </button>
      </div>
    </div>
  );
}
