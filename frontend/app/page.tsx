
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import FAQ from './components/FAQ';

export default function LandingPage() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0f0f 0%, #1a1a1a 100%)' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1.5rem',
          background: 'rgba(255, 107, 53, 0.1)',
          border: '1px solid rgba(255, 107, 53, 0.3)',
          borderRadius: '50px',
          marginBottom: '2rem'
        }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            color: '#ff6b35',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Live on Arbitrum Sepolia Testnet
          </span>
        </div>

        <h1 style={{
          fontSize: '4rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
          lineHeight: '1.1'
        }}>
          Local Business Vouchers<br />on the Blockchain
        </h1>

        <p style={{
          fontSize: '1.3rem',
          color: '#b0b0b0',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          Buy, sell, and redeem vouchers from local businesses with complete transparency 
          and security. Powered by blockchain technology.
        </p>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            href="/marketplace"
            style={{
              padding: '1.25rem 3rem',
              background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              borderRadius: '12px',
              transition: 'all 0.3s',
              boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
            }}
          >
            Browse Marketplace
          </Link>

          <Link
            href="/business/dashboard"
            style={{
              padding: '1.25rem 3rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              borderRadius: '12px',
              transition: 'all 0.3s',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 53, 0.15)';
              e.currentTarget.style.borderColor = '#ff6b35';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Register Your Business
          </Link>
        </div>

        {/* Stats - Platform Capabilities */}
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '2rem',
  marginTop: '5rem',
  maxWidth: '900px',
  margin: '5rem auto 0'
}}>
  {[
    { label: 'Voucher Types', value: 'Unlimited', icon: '🎫', desc: 'Create any type of voucher' },
    { label: 'Transaction Speed', value: '< 2 sec', icon: '⚡', desc: 'Lightning fast on L2' },
    { label: 'Platform Fee', value: '2%', icon: '💎', desc: 'Low & transparent fees' }
  ].map((stat, idx) => (
    <div
      key={idx}
      style={{
        background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        textAlign: 'center',
        transition: 'all 0.3s'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
      <div style={{
        fontSize: '2rem',
        fontWeight: '800',
        color: '#ff6b35',
        marginBottom: '0.5rem'
      }}>
        {stat.value}
      </div>
      <div style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '600', marginBottom: '0.5rem' }}>
        {stat.label}
      </div>
      <div style={{ fontSize: '0.85rem', color: '#888' }}>
        {stat.desc}
      </div>
    </div>
  ))}
</div>

      </section>

      {/* Features Section */}
      <section style={{
        maxWidth: '1400px',
        margin: '6rem auto',
        padding: '0 2rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '1rem',
          letterSpacing: '-0.01em'
        }}>
          Why Service Ledger?
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#b0b0b0',
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '700px',
          margin: '0 auto 4rem'
        }}>
          A decentralized marketplace connecting local businesses with customers through blockchain-verified vouchers
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {[
            {
              icon: '🛒',
              title: 'For Customers',
              description: 'Purchase vouchers at discounted rates, own them securely on-chain, and redeem at partner businesses anytime.',
              features: ['Blockchain verified', 'Instant purchase', 'Tradeable assets']
            },
            {
              icon: '🏢',
              title: 'For Businesses',
              description: 'Create and sell vouchers to reach new customers, boost cash flow, and build loyalty with zero intermediaries.',
              features: ['Direct payments', 'No middlemen', 'Full control']
            },
            {
              icon: '🔒',
              title: 'Secure & Transparent',
              description: 'All transactions recorded on blockchain with smart contracts ensuring trust and automatic execution.',
              features: ['Immutable records', 'Smart contracts', 'Decentralized']
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
                padding: '2.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 107, 53, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '1rem'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {feature.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {feature.features.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#b0b0b0'
                    }}
                  >
                    <span style={{ color: '#ff6b35', fontSize: '1.2rem' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        maxWidth: '1400px',
        margin: '6rem auto',
        padding: '0 2rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '1rem',
          letterSpacing: '-0.01em'
        }}>
          How It Works
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#b0b0b0',
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '700px',
          margin: '0 auto 4rem'
        }}>
          Get started in 3 simple steps
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          position: 'relative'
        }}>
          {[
            {
              step: '01',
              title: 'Connect Wallet',
              description: 'Connect your Web3 wallet to start using the platform. We support MetaMask and other popular wallets.'
            },
            {
              step: '02',
              title: 'Browse & Buy',
              description: 'Explore vouchers from local businesses, choose what you like, and purchase with SLR tokens instantly.'
            },
            {
              step: '03',
              title: 'Redeem Anytime',
              description: 'Visit the business and redeem your voucher. All transactions are recorded on the blockchain.'
            }
          ].map((step, idx) => (
            <div
              key={idx}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 127, 0, 0.05) 100%)',
                padding: '2.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '2rem',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: '800',
                color: 'white',
                boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)'
              }}>
                {step.step}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginTop: '2rem',
                marginBottom: '1rem'
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                lineHeight: '1.6'
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Development Phases */}
      <section style={{
        maxWidth: '1400px',
        margin: '6rem auto',
        padding: '0 2rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '1rem',
          letterSpacing: '-0.01em'
        }}>
          Development Roadmap
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#b0b0b0',
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '700px',
          margin: '0 auto 4rem'
        }}>
          Our journey to revolutionize local commerce
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {[
            {
              phase: 'Phase 1',
              status: 'completed',
              title: 'Foundation & Smart Contracts',
              items: ['ERC1155 voucher contract', 'ERC20 payment token', 'Basic marketplace UI', 'Wallet integration']
            },
            {
              phase: 'Phase 2',
              status: 'current',
              title: 'Enhanced Platform',
              items: ['Professional UI redesign', 'Business dashboard', 'Voucher metadata on IPFS', 'Multi-voucher support']
            },
            {
              phase: 'Phase 3',
              status: 'upcoming',
              title: 'Advanced Features',
              items: ['QR code redemption', 'Mobile app', 'Analytics dashboard', 'Multi-chain deployment']
            }
          ].map((phase, idx) => (
            <div
              key={idx}
              style={{
                background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
                padding: '2rem',
                borderRadius: '16px',
                border: phase.status === 'current' 
                  ? '2px solid #ff6b35' 
                  : '1px solid rgba(255, 255, 255, 0.08)',
                position: 'relative',
                boxShadow: phase.status === 'current' 
                  ? '0 4px 20px rgba(255, 107, 53, 0.3)' 
                  : 'none'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '0.5rem'
                  }}>
                    {phase.phase}
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#b0b0b0'
                  }}>
                    {phase.title}
                  </p>
                </div>
                <div style={{
                  padding: '0.5rem 1.25rem',
                  background: phase.status === 'completed' 
                    ? 'rgba(76, 175, 80, 0.15)' 
                    : phase.status === 'current'
                    ? 'rgba(255, 107, 53, 0.15)'
                    : 'rgba(158, 158, 158, 0.15)',
                  border: `1px solid ${
                    phase.status === 'completed' 
                      ? '#4caf50' 
                      : phase.status === 'current'
                      ? '#ff6b35'
                      : '#9e9e9e'
                  }`,
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: phase.status === 'completed' 
                    ? '#4caf50' 
                    : phase.status === 'current'
                    ? '#ff6b35'
                    : '#9e9e9e',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {phase.status === 'completed' ? '✓ Completed' : phase.status === 'current' ? '⚡ In Progress' : '📅 Coming Soon'}
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {phase.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.95rem',
                      color: '#b0b0b0'
                    }}
                  >
                    <span style={{ 
                      color: phase.status === 'completed' ? '#4caf50' : '#ff6b35',
                      fontSize: '1.2rem'
                    }}>
                      {phase.status === 'completed' ? '✓' : '•'}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQ />

      {/* CTA Section */}
      <section style={{
        maxWidth: '1400px',
        margin: '6rem auto 4rem',
        padding: '0 2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
          padding: '4rem 3rem',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1rem',
            letterSpacing: '-0.01em'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            Join the future of local commerce. Buy vouchers, support local businesses, all on the blockchain.
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/marketplace"
              style={{
                padding: '1.25rem 3rem',
                background: 'white',
                color: '#ff6b35',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1.1rem',
                borderRadius: '12px',
                transition: 'all 0.3s',
                display: 'inline-block',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              }}
            >
              Explore Marketplace
            </Link>

            <a
              href="https://faucet-slr.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '1.25rem 3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1.1rem',
                borderRadius: '12px',
                transition: 'all 0.3s',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'inline-block',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'white';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              💧 Get Test Tokens
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '3rem 2rem',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Image 
              src="/logo.png" 
              alt="Service Ledger" 
              width={40} 
              height={40}
              style={{ borderRadius: '8px' }}
            />
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: '#ffffff'
            }}>
              Service Ledger
            </span>
          </div>
          <p style={{
            fontSize: '0.9rem',
            color: '#b0b0b0'
          }}>
            © 2025 Service Ledger. Built on blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
}