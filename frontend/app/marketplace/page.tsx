"use client";
import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '../lib/contracts';
import { useState, useEffect } from 'react';
import { formatUnits } from 'viem';
import Navbar from '../components/Navbar';

interface VoucherData {
  id: number;
  business: string;
  price: bigint;
  expiry: bigint;
  active: boolean;
  uri: string;
  metadata: any;
  remainingUnits: bigint;
}

export default function Marketplace() {
  const { address } = useAccount();
  const [vouchers, setVouchers] = useState<VoucherData[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState('1');
  const [needsApproval, setNeedsApproval] = useState(false);

  const { writeContract: writeContractFn, isPending, data: txHash } = useWriteContract();

  const { isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const { data: slrBalance, refetch: refetchBalance } = useReadContract({
    ...CONTRACTS.slr,
    functionName: 'balanceOf',
    args: address ? [address] : undefined
  }) as { data: bigint | undefined, refetch: any };

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    ...CONTRACTS.slr,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.localVouchers.address] : undefined
  }) as { data: bigint | undefined, refetch: any };

  // Voucher reads
  const { data: voucher1 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'vouchers',
    args: [BigInt(1)]
  });

  const { data: uri1 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'uri',
    args: [BigInt(1)]
  });

  // NEW: Read business balance for voucher 1
  const { data: businessBalance1, refetch: refetchBalance1 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'balanceOf',
    args: voucher1 ? [(voucher1 as [string, bigint, bigint, boolean])[0], BigInt(1)] : undefined
  }) as { data: bigint | undefined, refetch: any };

  const { data: voucher2 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'vouchers',
    args: [BigInt(2)]
  });

  const { data: uri2 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'uri',
    args: [BigInt(2)]
  });

  // NEW: Read business balance for voucher 2
  const { data: businessBalance2, refetch: refetchBalance2 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'balanceOf',
    args: voucher2 ? [(voucher2 as [string, bigint, bigint, boolean])[0], BigInt(2)] : undefined
  }) as { data: bigint | undefined, refetch: any };

  const { data: voucher3 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'vouchers',
    args: [BigInt(3)]
  });

  const { data: uri3 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'uri',
    args: [BigInt(3)]
  });

  // NEW: Read business balance for voucher 3
  const { data: businessBalance3, refetch: refetchBalance3 } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'balanceOf',
    args: voucher3 ? [(voucher3 as [string, bigint, bigint, boolean])[0], BigInt(3)] : undefined
  }) as { data: bigint | undefined, refetch: any };

  // UPDATED: Refetch balances after successful transaction
  useEffect(() => {
    if (txSuccess) {
      refetchAllowance();
      refetchBalance();
      refetchBalance1();
      refetchBalance2();
      refetchBalance3();
    }
  }, [txSuccess]);

  // UPDATED: Use business balance instead of metadata
  useEffect(() => {
    const loadVouchers = async () => {
      const allVouchers: VoucherData[] = [];

      // Voucher 1
      if (voucher1 && uri1 && businessBalance1 !== undefined) {
        const v = voucher1 as [string, bigint, bigint, boolean];
        // Only show if active, valid business, and has remaining units
        if (v[3] && v[0] !== '0x0000000000000000000000000000000000000000' && businessBalance1 > BigInt(0)) {
          const metadata = await fetchMetadata(uri1 as string);
          allVouchers.push({
            id: 1,
            business: v[0],
            price: v[1],
            expiry: v[2],
            active: v[3],
            uri: uri1 as string,
            metadata,
            remainingUnits: businessBalance1 // Use on-chain balance
          });
        }
      }

      // Voucher 2
      if (voucher2 && uri2 && businessBalance2 !== undefined) {
        const v = voucher2 as [string, bigint, bigint, boolean];
        if (v[3] && v[0] !== '0x0000000000000000000000000000000000000000' && businessBalance2 > BigInt(0)) {
          const metadata = await fetchMetadata(uri2 as string);
          allVouchers.push({
            id: 2,
            business: v[0],
            price: v[1],
            expiry: v[2],
            active: v[3],
            uri: uri2 as string,
            metadata,
            remainingUnits: businessBalance2 // Use on-chain balance
          });
        }
      }

      // Voucher 3
      if (voucher3 && uri3 && businessBalance3 !== undefined) {
        const v = voucher3 as [string, bigint, bigint, boolean];
        if (v[3] && v[0] !== '0x0000000000000000000000000000000000000000' && businessBalance3 > BigInt(0)) {
          const metadata = await fetchMetadata(uri3 as string);
          allVouchers.push({
            id: 3,
            business: v[0],
            price: v[1],
            expiry: v[2],
            active: v[3],
            uri: uri3 as string,
            metadata,
            remainingUnits: businessBalance3 // Use on-chain balance
          });
        }
      }

      setVouchers(allVouchers);
    };

    loadVouchers();
  }, [voucher1, uri1, businessBalance1, voucher2, uri2, businessBalance2, voucher3, uri3, businessBalance3]);

  const fetchMetadata = async (uri: string) => {
    try {
      const ipfsUrl = uri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
      console.log('Fetching from:', ipfsUrl);
      const response = await fetch(ipfsUrl);
      const data = await response.json();
      console.log('Metadata:', data);

      // Extract business name and city from attributes
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

  const handleBuyVoucher = async (tokenId: number, price: bigint) => {
    const amount = BigInt(purchaseAmount);
    const totalCost = price * amount;

    // Check if approval needed
    if (!allowance || allowance < totalCost) {
      const maxUint256 = BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935');

      setNeedsApproval(true);
      writeContractFn({
        ...CONTRACTS.slr,
        functionName: 'approve',
        args: [CONTRACTS.localVouchers.address, maxUint256]
      });
    } else {
      setNeedsApproval(false);
      writeContractFn({
        ...CONTRACTS.localVouchers,
        functionName: 'buyVoucher',
        args: [BigInt(tokenId), amount]
      });
    }
  };

  useEffect(() => {
    if (txSuccess && needsApproval && selectedVoucher) {
      setTimeout(() => {
        const voucher = vouchers.find(v => v.id === selectedVoucher);
        if (voucher) {
          setNeedsApproval(false);
          writeContractFn({
            ...CONTRACTS.localVouchers,
            functionName: 'buyVoucher',
            args: [BigInt(selectedVoucher), BigInt(purchaseAmount)]
          });
        }
      }, 2000);
    }
  }, [txSuccess, needsApproval, selectedVoucher]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0f0f 0%, #1a1a1a 100%)' }}>
      <Navbar />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #2A3132 0%, #1a1a1a 100%)',
          borderRadius: '16px',
          padding: '3rem 2.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                fontSize: '2.75rem', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em'
              }}>
                Marketplace
              </h1>
              <p style={{ color: '#b0b0b0', fontSize: '1.05rem', fontWeight: '400' }}>
                Discover and purchase local business vouchers with instant blockchain verification
              </p>
            </div>

            {address && slrBalance && (
              <div style={{ 
                background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
                borderRadius: '16px',
                padding: '2rem',
                color: 'white',
                boxShadow: '0 8px 24px rgba(255, 107, 53, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{ fontSize: '0.85rem', opacity: 0.95, marginBottom: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Your Balance
                </p>
                <p style={{ fontSize: '2.25rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
                  {formatUnits(slrBalance, 18)} SLR
                </p>
              </div>
            )}
          </div>
        </div>

        {vouchers.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.5rem' }}>No Active Vouchers</h3>
            <p style={{ color: '#b0b0b0' }}>Check back later for new vouchers from local businesses.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {vouchers.map((voucher) => (
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
                    {voucher.remainingUnits.toString()} units left
                  </div>
                </div>

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
                      <span style={{ fontSize: '0.85rem', color: '#b0b0b0', fontWeight: '600' }}>Price per unit</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ff6b35' }}>
                        {formatUnits(voucher.price, 18)} SLR
                      </span>
                    </div>
                  </div>

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
                        Quantity (Max: {voucher.remainingUnits.toString()})
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={voucher.remainingUnits.toString()}
                        value={purchaseAmount}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val <= Number(voucher.remainingUnits)) {
                            setPurchaseAmount(e.target.value);
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

                      <div style={{
                        background: 'rgba(255, 107, 53, 0.1)',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        border: '1px solid rgba(255, 107, 53, 0.3)'
                      }}>
                        <span style={{ fontSize: '0.85rem', color: '#b0b0b0', fontWeight: '600' }}>Total Cost: </span>
                        <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ff6b35' }}>
                          {formatUnits(voucher.price * BigInt(purchaseAmount || 1), 18)} SLR
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyVoucher(voucher.id, voucher.price);
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
                        {isPending ? (needsApproval ? 'Approving...' : 'Buying...') : 'Buy Now'}
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
                      Select to Purchase
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