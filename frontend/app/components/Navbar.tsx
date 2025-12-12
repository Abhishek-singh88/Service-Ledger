"use client";
import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #2A3132 0%, #1a1a1a 100%)',
      padding: '1rem 2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Left: Logo + Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}>
            <Image 
              src="/logo.png" 
              alt="Service Ledger Logo" 
              width={40} 
              height={40}
              style={{ borderRadius: '8px' }}
            />
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em'
            }}>
              Service Ledger
            </span>
          </Link>
        </div>
        
        {/* Center: Navigation Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>

          <Link href="/" style={{
            color: isActive('/') ? '#ff6b35' : '#b0b0b0',
            textDecoration: 'none',
            fontWeight: isActive('/') ? '700' : '500',
            fontSize: '0.95rem',
            transition: 'all 0.2s',
            borderBottom: isActive('/') ? '2px solid #ff6b35' : 'none',
            paddingBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => {
            if (!isActive('/')) e.currentTarget.style.color = '#ff6b35';
          }}
          onMouseOut={(e) => {
            if (!isActive('/')) e.currentTarget.style.color = '#b0b0b0';
          }}
          >
            Home
          </Link>

          <Link href="/marketplace" style={{
            color: isActive('/marketplace') ? '#ff6b35' : '#b0b0b0',
            textDecoration: 'none',
            fontWeight: isActive('/marketplace') ? '700' : '500',
            fontSize: '0.95rem',
            transition: 'all 0.2s',
            borderBottom: isActive('/marketplace') ? '2px solid #ff6b35' : 'none',
            paddingBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => {
            if (!isActive('/marketplace')) e.currentTarget.style.color = '#ff6b35';
          }}
          onMouseOut={(e) => {
            if (!isActive('/marketplace')) e.currentTarget.style.color = '#b0b0b0';
          }}
          >
            Marketplace
          </Link>
          
          <Link href="/my-vouchers" style={{
            color: isActive('/my-vouchers') ? '#ff6b35' : '#b0b0b0',
            textDecoration: 'none',
            fontWeight: isActive('/my-vouchers') ? '700' : '500',
            fontSize: '0.95rem',
            transition: 'all 0.2s',
            borderBottom: isActive('/my-vouchers') ? '2px solid #ff6b35' : 'none',
            paddingBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => {
            if (!isActive('/my-vouchers')) e.currentTarget.style.color = '#ff6b35';
          }}
          onMouseOut={(e) => {
            if (!isActive('/my-vouchers')) e.currentTarget.style.color = '#b0b0b0';
          }}
          >
            My Vouchers
          </Link>
          
          <Link href="/business/dashboard" style={{
            color: isActive('/business/dashboard') ? '#ff6b35' : '#b0b0b0',
            textDecoration: 'none',
            fontWeight: isActive('/business/dashboard') ? '700' : '500',
            fontSize: '0.95rem',
            transition: 'all 0.2s',
            borderBottom: isActive('/business/dashboard') ? '2px solid #ff6b35' : 'none',
            paddingBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => {
            if (!isActive('/business/dashboard')) e.currentTarget.style.color = '#ff6b35';
          }}
          onMouseOut={(e) => {
            if (!isActive('/business/dashboard')) e.currentTarget.style.color = '#b0b0b0';
          }}
          >
            Business
          </Link>

          {/* Faucet Link */}
          <a 
            href="https://faucet-slr.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.85rem',
              borderRadius: '8px',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 107, 53, 0.3)';
            }}
          >
            💧 Get Faucet
          </a>
        </div>
        
        {/* Right: Connect Button */}
        <ConnectButton />
      </div>
    </nav>
  );
}
