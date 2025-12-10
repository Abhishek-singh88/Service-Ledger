"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '../..//lib/contracts';
import { useState } from 'react';
import { parseUnits } from 'viem';

interface Business {
  registered: boolean;
  owner: string;
  metadataURI: string;
}

export default function BusinessDashboard() {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    businessName: '',
    title: '',
    description: '',
    imageUrl: '',
    city: '',
    units: '5',
    price: '10',
    expiry: '0'
  });

  const { writeContract: writeContractFn, data: hash, isPending } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Check if registered
  const { data: business, refetch } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'businesses',
    args: address ? [address] : undefined
  });

  const businessData = business as [boolean, string, string] | undefined;
const isRegistered = businessData ? businessData[0] : false;


  console.log('Business data:', businessData);
console.log('Is registered:', isRegistered);
console.log('Address:', address);


  // Register
  const handleRegister = () => {
    writeContractFn({
      ...CONTRACTS.localVouchers,
      functionName: 'registerBusiness',
      args: ['ipfs://business-metadata']
    });
  };

  // Refetch when transaction is confirmed
  if (isConfirmed && !isRegistered) {
    setTimeout(() => refetch(), 2000);
  }

  // Create voucher
  const handleCreateVoucher = async () => {
    try {
      const res = await fetch('/api/uploadVoucherMetadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const { uri } = await res.json();

      const price = parseUnits(formData.price, 18);
      const expiry = BigInt(formData.expiry);

      writeContractFn({
        ...CONTRACTS.localVouchers,
        functionName: 'createVoucher',
        args: [price, expiry, uri]
      });

      alert(`Voucher creation transaction submitted with URI: ${uri}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create voucher');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Business Dashboard</h1>
      <ConnectButton />

      {/* Transaction status */}
      {isPending && <p style={{ color: 'orange' }}>⏳ Waiting for wallet confirmation...</p>}
      {isConfirming && <p style={{ color: 'blue' }}>⏳ Transaction confirming on blockchain...</p>}
      {isConfirmed && <p style={{ color: 'green' }}>✅ Transaction confirmed!</p>}

      {!isRegistered ? (
        <div style={{ marginTop: '2rem' }}>
          <h2>Register Your Business</h2>
          <p>You need to register before creating vouchers.</p>
          <button 
            onClick={handleRegister} 
            style={{ padding: '0.5rem 1rem' }}
            disabled={isPending || isConfirming}
          >
            {isPending || isConfirming ? 'Registering...' : 'Register Business'}
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <h2>Create Voucher</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
            <input 
              placeholder="Business Name" 
              value={formData.businessName} 
              onChange={e => setFormData({...formData, businessName: e.target.value})}
              style={{ padding: '0.5rem' }}
            />
            <input 
              placeholder="Voucher Title" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              style={{ padding: '0.5rem' }}
            />
            <textarea 
              placeholder="Description" 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              style={{ padding: '0.5rem', minHeight: '80px' }}
            />
            <input 
              placeholder="Image URL" 
              value={formData.imageUrl} 
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              style={{ padding: '0.5rem' }}
            />
            <input 
              placeholder="City" 
              value={formData.city} 
              onChange={e => setFormData({...formData, city: e.target.value})}
              style={{ padding: '0.5rem' }}
            />
            <input 
              placeholder="Units" 
              type="number"
              value={formData.units} 
              onChange={e => setFormData({...formData, units: e.target.value})}
              style={{ padding: '0.5rem' }}
            />
            <input 
              placeholder="Price (SLR)" 
              type="number"
              value={formData.price} 
              onChange={e => setFormData({...formData, price: e.target.value})}
              style={{ padding: '0.5rem' }}
            />
            <input 
              placeholder="Expiry (unix timestamp, 0=none)" 
              type="number"
              value={formData.expiry} 
              onChange={e => setFormData({...formData, expiry: e.target.value})}
              style={{ padding: '0.5rem' }}
            />
            <button 
              onClick={handleCreateVoucher} 
              style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
              disabled={isPending || isConfirming}
            >
              {isPending || isConfirming ? 'Creating...' : 'Create Voucher'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
