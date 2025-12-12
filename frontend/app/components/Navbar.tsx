"use client";
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <Link href="/" style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffffff',
            textDecoration: 'none',
            letterSpacing: '0.5px'
          }}>
            Service Ledger
          </Link>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{
              color: isActive('/') ? '#ffffff' : '#a0a0a0',
              textDecoration: 'none',
              fontWeight: isActive('/') ? '600' : '400',
              fontSize: '0.95rem',
              transition: 'color 0.2s',
              borderBottom: isActive('/') ? '2px solid #ffffff' : 'none',
              paddingBottom: '0.25rem'
            }}>
              Marketplace
            </Link>
            
            <Link href="/my-vouchers" style={{
              color: isActive('/my-vouchers') ? '#ffffff' : '#a0a0a0',
              textDecoration: 'none',
              fontWeight: isActive('/my-vouchers') ? '600' : '400',
              fontSize: '0.95rem',
              transition: 'color 0.2s',
              borderBottom: isActive('/my-vouchers') ? '2px solid #ffffff' : 'none',
              paddingBottom: '0.25rem'
            }}>
              My Vouchers
            </Link>
            
            <Link href="/business/dashboard" style={{
              color: isActive('/business/dashboard') ? '#ffffff' : '#a0a0a0',
              textDecoration: 'none',
              fontWeight: isActive('/business/dashboard') ? '600' : '400',
              fontSize: '0.95rem',
              transition: 'color 0.2s',
              borderBottom: isActive('/business/dashboard') ? '2px solid #ffffff' : 'none',
              paddingBottom: '0.25rem'
            }}>
              Business Dashboard
            </Link>
          </div>
        </div>
        
        <ConnectButton />
      </div>
    </nav>
  );
}
