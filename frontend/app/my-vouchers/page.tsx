"use client";
import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '../lib/contracts';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

interface OwnedVoucher {
  id: number;
  balance: bigint;
  uri: string;
  metadata: any;
}

export default function MyVouchers() {
  const { address } = useAccount();
  const [ownedVouchers, setOwnedVouchers] = useState<OwnedVoucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
  const [redeemAmount, setRedeemAmount] = useState('1');

  const { writeContract: writeContractFn, isPending, data: txHash } = useWriteContract();
  
  const { isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Read balances for voucher IDs 1, 2, 3
  const { data: balance1, refetch: refetchBalance1 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(1)] : undefined
  }) as { data: bigint | undefined, refetch: any };

  const { data: uri1 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'uri',
    args: [BigInt(1)]
  });

  const { data: balance2, refetch: refetchBalance2 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(2)] : undefined
  }) as { data: bigint | undefined, refetch: any };

  const { data: uri2 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'uri',
    args: [BigInt(2)]
  });

  const { data: balance3, refetch: refetchBalance3 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(3)] : undefined
  }) as { data: bigint | undefined, refetch: any };

  const { data: uri3 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'uri',
    args: [BigInt(3)]
  });

  // Refetch balances after successful transaction
  useEffect(() => {
    if (txSuccess) {
      refetchBalance1();
      refetchBalance2();
      refetchBalance3();
      setSelectedVoucher(null);
      setRedeemAmount('1');
    }
  }, [txSuccess]);

  // Load owned vouchers
  useEffect(() => {
    const loadOwnedVouchers = async () => {
      const vouchers: OwnedVoucher[] = [];

      // Voucher 1
      if (balance1 && balance1 > BigInt(0) && uri1) {
        const metadata = await fetchMetadata(uri1 as string);
        vouchers.push({
          id: 1,
          balance: balance1,
          uri: uri1 as string,
          metadata
        });
      }

      // Voucher 2
      if (balance2 && balance2 > BigInt(0) && uri2) {
        const metadata = await fetchMetadata(uri2 as string);
        vouchers.push({
          id: 2,
          balance: balance2,
          uri: uri2 as string,
          metadata
        });
      }

      // Voucher 3
      if (balance3 && balance3 > BigInt(0) && uri3) {
        const metadata = await fetchMetadata(uri3 as string);
        vouchers.push({
          id: 3,
          balance: balance3,
          uri: uri3 as string,
          metadata
        });
      }

      setOwnedVouchers(vouchers);
    };

    if (address) {
      loadOwnedVouchers();
    }
  }, [address, balance1, uri1, balance2, uri2, balance3, uri3]);

  const fetchMetadata = async (uri: string) => {
    try {
      const ipfsUrl = uri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
      const response = await fetch(ipfsUrl);
      const data = await response.json();
      
      let businessName = '';
      let city = '';
      
      if (data.attributes && Array.isArray(data.attributes)) {
        const businessAttr = data.attributes.find((attr: any) => attr.trait_type === 'Business');
        const cityAttr = data.attributes.find((attr: any) => attr.trait_type === 'City');
        
        if (businessAttr) businessName = businessAttr.value;
        if (cityAttr) city = cityAttr.value;
      }
      
      return {
        ...data,
        businessName,
        city,
        imageUrl: data.image
      };
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return null;
    }
  };

  const handleRedeem = (tokenId: number) => {
    const amount = BigInt(redeemAmount);
    writeContractFn({
      ...CONTRACTS.localVouchers,
      functionName: 'redeemSelf',
      args: [BigInt(tokenId), amount]
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0f0f 0%, #1a1a1a 100%)' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Hero */}
        <div style={{ 
          background: 'linear-gradient(135deg, #2A3132 0%, #1a1a1a 100%)',
          borderRadius: '16px',
          padding: '3rem 2.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <h1 style={{ 
            fontSize: '2.75rem', 
            fontWeight: '800', 
            background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em'
          }}>
            My Vouchers
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: '1.05rem', fontWeight: '400' }}>
            View and redeem your purchased vouchers
          </p>
        </div>

        {/* Vouchers Grid */}
        {!address ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.5rem' }}>Connect Your Wallet</h3>
            <p style={{ color: '#b0b0b0' }}>Please connect your wallet to view your vouchers.</p>
          </div>
        ) : ownedVouchers.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.5rem' }}>No Vouchers Yet</h3>
            <p style={{ color: '#b0b0b0' }}>You haven't purchased any vouchers. Visit the Marketplace to get started!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {ownedVouchers.map((voucher) => (
              <div
                key={voucher.id}
                style={{
                  background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: selectedVoucher === voucher.id 
                    ? '0 12px 32px rgba(255, 107, 53, 0.4)' 
                    : '0 8px 24px rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: selectedVoucher === voucher.id ? '2px solid #ff6b35' : '2px solid rgba(255, 255, 255, 0.08)',
                  transform: selectedVoucher === voucher.id ? 'translateY(-4px)' : 'translateY(0)'
                }}
                onClick={() => setSelectedVoucher(voucher.id)}
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: voucher.metadata?.imageUrl 
                    ? `url(${voucher.metadata.imageUrl})` 
                    : 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  {selectedVoucher === voucher.id && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: '#ff6b35',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Selected
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    You own: {voucher.balance.toString()}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  {voucher.metadata?.businessName && (
                    <p style={{
                      fontSize: '0.8rem',
                      color: '#ff6b35',
                      fontWeight: '700',
                      margin: '0 0 0.5rem 0',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {voucher.metadata.businessName}
                    </p>
                  )}

                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    margin: '0 0 0.75rem 0'
                  }}>
                    {voucher.metadata?.name || `Voucher #${voucher.id}`}
                  </h3>

                  {voucher.metadata?.description && (
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#b0b0b0',
                      lineHeight: '1.6',
                      margin: '0 0 1rem 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {voucher.metadata.description}
                    </p>
                  )}

                  {voucher.metadata?.city && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                      color: '#b0b0b0',
                      fontSize: '0.85rem'
                    }}>
                      <span>📍</span>
                      <span style={{ fontWeight: '600', color: '#ffffff' }}>{voucher.metadata.city}</span>
                    </div>
                  )}

                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '1rem',
                    borderRadius: '12px',
                    marginBottom: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#b0b0b0', fontWeight: '600' }}>Your Balance</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ff6b35' }}>
                        {voucher.balance.toString()}
                      </span>
                    </div>
                  </div>

                  {/* Redeem Section */}
                  {selectedVoucher === voucher.id && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: '#b0b0b0',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Quantity to Redeem (Max: {voucher.balance.toString()})
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={voucher.balance.toString()}
                        value={redeemAmount}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val <= Number(voucher.balance)) {
                            setRedeemAmount(e.target.value);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          border: '2px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          marginBottom: '1rem',
                          boxSizing: 'border-box',
                          background: 'rgba(0, 0, 0, 0.3)',
                          color: '#ffffff',
                          fontWeight: '600'
                        }}
                      />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRedeem(voucher.id);
                        }}
                        disabled={isPending}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: isPending ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
                          color: isPending ? '#666' : 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          fontWeight: '700',
                          cursor: isPending ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {isPending ? 'Redeeming...' : 'Redeem Now'}
                      </button>
                    </div>
                  )}

                  {selectedVoucher !== voucher.id && (
                    <button
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        color: '#ffffff',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 107, 53, 0.2)';
                        e.currentTarget.style.borderColor = '#ff6b35';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      Select to Redeem
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
