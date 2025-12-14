"use client";
import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '../../lib/contracts';
import { useState, useEffect } from 'react';
import { parseUnits } from 'viem';
import Navbar from '../../components/Navbar';

interface Business {
  registered: boolean;
  owner: string;
  metadataURI: string;
}

export default function BusinessDashboard() {
  const { address, isConnected } = useAccount();
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

  const { writeContract: writeContractFn, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: business, refetch } = useReadContract({
    ...CONTRACTS.localVouchers,
    functionName: 'businesses',
    args: address ? [address] : undefined
  });

  const businessData = business as [boolean, string, string] | undefined;
  const isRegistered = businessData ? businessData[0] : false;

  // Log errors for debugging
  useEffect(() => {
    if (error) {
      console.error('Transaction error:', error);
    }
  }, [error]);

  // Refetch after confirmation
  useEffect(() => {
    if (isConfirmed && !isRegistered) {
      setTimeout(() => refetch(), 2000);
    }
  }, [isConfirmed, isRegistered]);

  const handleRegister = () => {
    writeContractFn({
      ...CONTRACTS.localVouchers,
      functionName: 'registerBusiness',
      args: ['ipfs://business-metadata']
    });
  };

  const handleCreateVoucher = async () => {
    try {
      const res = await fetch('/api/uploadVoucherMetadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const { uri } = await res.json();

      const price = parseUnits(formData.price, 18);
      const expiry = BigInt(formData.expiry || '0');
      const initialSupply = BigInt(formData.units || '0');

      if (initialSupply <= BigInt(0)) {
        alert('Units must be greater than 0');
        return;
      }

      writeContractFn({
        ...CONTRACTS.localVouchers,
        functionName: 'createVoucher',
        args: [price, expiry, initialSupply, uri]
      });

      alert(`Voucher creation transaction submitted with URI: ${uri}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create voucher');
    }
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
            Business Dashboard
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: '1.05rem', fontWeight: '400' }}>
            Manage your business and create vouchers for your customers
          </p>
        </div>

        {/* Status Banner */}
        {(isPending || isConfirming || isConfirmed) && (
          <div style={{
            background: isPending
              ? 'linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 152, 0, 0.15) 100%)'
              : isConfirming
                ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(21, 101, 192, 0.15) 100%)'
                : 'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(56, 142, 60, 0.15) 100%)',
            border: `2px solid ${isPending ? '#ffc107' : isConfirming ? '#2196F3' : '#4caf50'}`,
            borderRadius: '12px',
            padding: '1.25rem 1.75rem',
            marginBottom: '2rem',
            fontSize: '0.95rem',
            color: '#ffffff',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>
              {isPending && '⏳'}
              {isConfirming && '⏱️'}
              {isConfirmed && '✅'}
            </span>
            <span>
              {isPending && 'Waiting for wallet confirmation...'}
              {isConfirming && 'Transaction confirming on blockchain...'}
              {isConfirmed && 'Transaction confirmed successfully!'}
            </span>
          </div>
        )}

        {!isConnected ? (
          /* Connect Wallet Screen */
          <div style={{
            background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
            borderRadius: '16px',
            padding: '4rem 3rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.5rem' }}>
              Connect Your Wallet
            </h2>
            <div style={{ color: '#b0b0b0' }}>
              Please connect your wallet to Register Business.
            </div>
          </div>
        ) : !isRegistered ? (
          /* Registration Card */
          <div style={{
            background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
            borderRadius: '16px',
            padding: '4rem 3rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              fontSize: '2.5rem'
            }}>
              🏢
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '1rem',
              letterSpacing: '-0.01em'
            }}>
              Register Your Business
            </h2>
            <p style={{ color: '#b0b0b0', marginBottom: '2.5rem', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              Complete your business registration to start creating and selling vouchers on the blockchain.
            </p>
            <button
              onClick={handleRegister}
              style={{
                padding: '1.25rem 3.5rem',
                background: isPending || isConfirming
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
                color: isPending || isConfirming ? '#666' : 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: '700',
                cursor: isPending || isConfirming ? 'not-allowed' : 'pointer',
                boxShadow: isPending || isConfirming ? 'none' : '0 6px 20px rgba(255, 107, 53, 0.5)',
                transition: 'all 0.3s',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              disabled={isPending || isConfirming}
              onMouseOver={(e) => {
                if (!isPending && !isConfirming) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.7)';
                }
              }}
              onMouseOut={(e) => {
                if (!isPending && !isConfirming) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.5)';
                }
              }}
            >
              {isPending || isConfirming ? 'Registering...' : 'Register Now'}
            </button>
          </div>
        ) : (
          /* Create Voucher Form */
          <div style={{
            background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '2rem',
              letterSpacing: '-0.01em'
            }}>
              Create New Voucher
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              maxWidth: '1000px'
            }}>
              {/* Business Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#b0b0b0',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Business Name
                </label>
                <input
                  placeholder="Enter business name"
                  value={formData.businessName}
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ff6b35';
                    e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

              {/* Voucher Title */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#b0b0b0',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Voucher Title
                </label>
                <input
                  placeholder="e.g., Coffee Pass, Gym Membership"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ff6b35';
                    e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#b0b0b0',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe what this voucher offers..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    minHeight: '120px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ff6b35';
                    e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

              {/* Image URL */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#b0b0b0',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Image URL
                </label>
                <input
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ff6b35';
                    e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

              {/* City */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#b0b0b0',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  City
                </label>
                <input
                  placeholder="e.g., New York, London"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ff6b35';
                    e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

              {/* Units */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#b0b0b0',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Total Units Available
                </label>
                <input
                  placeholder="Number of vouchers"
                  type="number"
                  value={formData.units}
                  onChange={e => setFormData({ ...formData, units: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ff6b35';
                    e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

              {/* Price */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#b0b0b0',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Price (in SLR tokens)
                </label>
                <input
                  placeholder="Price per voucher"
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ff6b35';
                    e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

{/* Expiry */}
<div style={{ gridColumn: '1 / -1' }}>
  <label style={{
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#b0b0b0',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  }}>
    Expiry Date
  </label>
  
  {/* Quick Preset Buttons */}
  <div style={{ 
    display: 'flex', 
    gap: '0.75rem', 
    marginBottom: '1rem',
    flexWrap: 'wrap'
  }}>
    {[
      { label: 'No Expiry', days: 0 },
      { label: '7 Days', days: 7 },
      { label: '30 Days', days: 30 },
      { label: '90 Days', days: 90 },
      { label: '1 Year', days: 365 }
    ].map((preset) => {
      const presetTimestamp = preset.days === 0 
        ? '0' 
        : Math.floor((Date.now() / 1000) + (preset.days * 24 * 60 * 60)).toString();
      const isActive = formData.expiry === presetTimestamp;
      
      return (
        <button
          key={preset.label}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setFormData({...formData, expiry: presetTimestamp});
          }}
          style={{
            padding: '0.5rem 1rem',
            background: isActive
              ? 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)'
              : 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = 'rgba(255, 107, 53, 0.3)';
            }
          }}
          onMouseOut={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
        >
          {preset.label}
        </button>
      );
    })}
  </div>

  {/* Manual Date Input */}
  <input 
    type="datetime-local"
    onChange={(e) => {
      const timestamp = e.target.value 
        ? Math.floor(new Date(e.target.value).getTime() / 1000).toString()
        : '0';
      setFormData({...formData, expiry: timestamp});
    }}
    style={{ 
      width: '100%',
      padding: '1rem',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s',
      boxSizing: 'border-box',
      background: 'rgba(0, 0, 0, 0.3)',
      color: '#ffffff',
      fontWeight: '600'
    }}
    onFocus={(e) => {
      e.target.style.borderColor = '#ff6b35';
      e.target.style.background = 'rgba(0, 0, 0, 0.5)';
    }}
    onBlur={(e) => {
      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      e.target.style.background = 'rgba(0, 0, 0, 0.3)';
    }}
  />
  
  <p style={{ 
    fontSize: '0.75rem', 
    color: '#888', 
    marginTop: '0.75rem',
    fontStyle: 'italic',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }}>
    {formData.expiry === '0' 
      ? '✨ No expiry - vouchers never expire' 
      : `📅 Expires: ${new Date(parseInt(formData.expiry) * 1000).toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        })}`}
  </p>
</div>

            </div>

            {/* Create Button */}
            <button
              onClick={handleCreateVoucher}
              style={{
                marginTop: '2.5rem',
                padding: '1.25rem 3.5rem',
                background: isPending || isConfirming
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
                color: isPending || isConfirming ? '#666' : 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: '700',
                cursor: isPending || isConfirming ? 'not-allowed' : 'pointer',
                boxShadow: isPending || isConfirming ? 'none' : '0 6px 20px rgba(255, 107, 53, 0.5)',
                transition: 'all 0.3s',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              disabled={isPending || isConfirming}
              onMouseOver={(e) => {
                if (!isPending && !isConfirming) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.7)';
                }
              }}
              onMouseOut={(e) => {
                if (!isPending && !isConfirming) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.5)';
                }
              }}
            >
              {isPending || isConfirming ? 'Creating Voucher...' : 'Create Voucher'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
