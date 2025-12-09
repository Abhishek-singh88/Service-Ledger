"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { CONTRACTS } from './lib/contracts';
import { useState } from 'react';
import { formatUnits } from 'viem';

// Define the voucher type
type VoucherInfo = readonly [bigint, `0x${string}`, boolean];

export default function Marketplace() {
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState('1');
  const [amount, setAmount] = useState('1');

  const { writeContract: writeContractFn } = useWriteContract();

  // Read voucher info with proper typing
  const { data: voucherInfo } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'vouchers',
    args: [BigInt(tokenId)]
  }) as { data: VoucherInfo | undefined };

  // Approve SLR
  const handleApprove = async () => {
    if (!voucherInfo) return;
    
    const total = voucherInfo[0] * BigInt(amount);
    
    writeContractFn({
      ...CONTRACTS.slr,
      functionName: 'approve',
      args: [CONTRACTS.localVouchers.address, total]
    });
  };

  // Buy voucher
  const handleBuy = async () => {
    writeContractFn({
      ...CONTRACTS.localVouchers,
      functionName: 'buyVoucher',
      args: [BigInt(tokenId), BigInt(amount)]
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Marketplace</h1>
      <ConnectButton />

      <div style={{ marginTop: '2rem' }}>
        <h2>Buy Voucher</h2>
        <input
          type="number"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <br />
        <button onClick={handleApprove} style={{ margin: '0.5rem', padding: '0.5rem' }}>
          1. Approve SLR
        </button>
        <button onClick={handleBuy} style={{ margin: '0.5rem', padding: '0.5rem' }}>
          2. Buy Voucher
        </button>

        {voucherInfo && (
          <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
            <p>Price: {formatUnits(voucherInfo[0], 18)} SLR per unit</p>
            <p>Business: {voucherInfo[1]}</p>
            <p>Active: {voucherInfo[2] ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
}