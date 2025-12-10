"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { CONTRACTS } from './lib/contracts';
import { useState } from 'react';
import { formatUnits } from 'viem';

interface VoucherInfo {
  business: string;
  price: bigint;
  expiry: bigint;
  active: boolean;
}

export default function Marketplace() {
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState('1');
  const [amount, setAmount] = useState('1');

  const { writeContract: writeContractFn, isPending } = useWriteContract();

  // Read voucher info
  const { data: voucherInfo } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'vouchers',
    args: [BigInt(tokenId)]
  });

  // Read SLR balance
  const { data: slrBalance } = useReadContract({
    ...CONTRACTS.slr,
    functionName: 'balanceOf',
    args: address ? [address] : undefined
  }) as { data: bigint | undefined };

  // Read SLR allowance with proper typing
  const { data: allowance } = useReadContract({
    ...CONTRACTS.slr,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.localVouchers.address] : undefined
  }) as { data: bigint | undefined };

  // Cast to tuple array format
  const voucher = voucherInfo as [string, bigint, bigint, boolean] | undefined;

  // Approve SLR
  const handleApprove = async () => {
    if (!voucher) return;
    
    const maxUint256 = BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935');
    
    console.log('Approving MAX amount for infinite approval');
    
    writeContractFn({
      ...CONTRACTS.slr,
      functionName: 'approve',
      args: [CONTRACTS.localVouchers.address, maxUint256]
    });
  };

  // Buy voucher
  const handleBuy = async () => {
    if (!voucher) return;
    
    console.log('Buying voucher:', {
      tokenId: BigInt(tokenId).toString(),
      amount: BigInt(amount).toString(),
      totalCost: (voucher[1] * BigInt(amount)).toString(),
      yourSLRBalance: slrBalance ? slrBalance.toString() : '0',
      allowance: allowance ? allowance.toString() : '0',
      voucherActive: voucher[3],
      business: voucher[0]
    });
    
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

      {/* Show SLR Balance */}
      {address && slrBalance && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0' }}>
          <p><strong>Your SLR Balance:</strong> {formatUnits(slrBalance, 18)} SLR</p>
          <p><strong>Allowance:</strong> {allowance ? formatUnits(allowance, 18) : '0'} SLR</p>
        </div>
      )}

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
        <button 
          onClick={handleApprove} 
          style={{ margin: '0.5rem', padding: '0.5rem' }}
          disabled={isPending || !voucher}
        >
          {isPending ? 'Processing...' : '1. Approve SLR'}
        </button>
        <button 
          onClick={handleBuy} 
          style={{ margin: '0.5rem', padding: '0.5rem' }}
          disabled={isPending || !voucher}
        >
          {isPending ? 'Processing...' : '2. Buy Voucher'}
        </button>

        {voucher && (
          <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
            <p><strong>Price:</strong> {formatUnits(voucher[1], 18)} SLR per unit</p>
            <p><strong>Total Cost:</strong> {formatUnits(voucher[1] * BigInt(amount), 18)} SLR</p>
            <p><strong>Business:</strong> {voucher[0]}</p>
            <p><strong>Active:</strong> {voucher[3] ? 'Yes ✅' : 'No ❌'}</p>
            <p><strong>Expiry:</strong> {voucher[2] === BigInt(0) ? 'No expiry' : new Date(Number(voucher[2]) * 1000).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}