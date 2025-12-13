"use client";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
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
  const [loading, setLoading] = useState(false);

  const { writeContract: writeContractFn, isPending, data: txHash } = useWriteContract();
  
  const { isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Refetch after successful transaction
  useEffect(() => {
    if (txSuccess) {
      loadOwnedVouchers();
      setSelectedVoucher(null);
      setRedeemAmount('1');
    }
  }, [txSuccess]);

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

  const loadOwnedVouchers = async () => {
    if (!address) return;

    try {
      setLoading(true);
      
      // Get max voucher ID
      const maxResponse = await fetch('/api/getMaxVoucherId');
      const { maxVoucherId } = await maxResponse.json();

      console.log('Max Voucher ID:', maxVoucherId);

      const vouchers: OwnedVoucher[] = [];

      // Loop through all voucher IDs
      for (let tokenId = 1; tokenId <= maxVoucherId; tokenId++) {
        try {
          // Get user's balance for this voucher
          const balanceResponse = await fetch(`/api/getUserBalance?address=${address}&tokenId=${tokenId}`);
          
          if (!balanceResponse.ok) continue;

          const { balance, uri } = await balanceResponse.json();

          // Only include vouchers user owns
          if (BigInt(balance) > BigInt(0)) {
            const metadata = await fetchMetadata(uri);

            vouchers.push({
              id: tokenId,
              balance: BigInt(balance),
              uri,
              metadata
            });
          }
        } catch (error) {
          console.error(`Error loading voucher ${tokenId}:`, error);
        }
      }

      console.log('Owned vouchers:', vouchers);
      setOwnedVouchers(vouchers);
    } catch (error) {
      console.error('Error loading owned vouchers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load owned vouchers on mount and when address changes
  useEffect(() => {
    if (address) {
      loadOwnedVouchers();
    } else {
      setOwnedVouchers([]);
    }
  }, [address]);

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

        {/* Loading State */}
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(255, 107, 53, 0.2)',
              borderTop: '4px solid #ff6b35',
              borderRadius: '50%',
              margin: '0 auto 1.5rem',
              animation: 'spin 1s linear infinite'
            }} />
            <h3 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Loading Your Vouchers...</h3>
            <p style={{ color: '#b0b0b0' }}>Fetching your vouchers from the blockchain</p>
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : !address ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 107, 53, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2.5rem'
            }}>
              🔌
            </div>
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
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 107, 53, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2.5rem'
            }}>
              🎫
            </div>
            <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.5rem' }}>No Vouchers Yet</h3>
            <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>You haven't purchased any vouchers. Visit the Marketplace to get started!</p>
            <a
              href="/marketplace"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Browse Marketplace
            </a>
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
