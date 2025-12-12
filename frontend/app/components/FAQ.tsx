"use client";
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Service Ledger?",
    answer: "Service Ledger is a decentralized marketplace that connects local businesses with customers through blockchain-verified vouchers. Businesses can create and sell vouchers, while customers can purchase and redeem them securely on-chain."
  },
  {
    question: "How do I buy vouchers?",
    answer: "First, connect your Web3 wallet (like MetaMask). Then browse the marketplace, select a voucher you want, and purchase it using SLR tokens. The voucher will be minted to your wallet as an ERC1155 token."
  },
  {
    question: "What tokens do I need?",
    answer: "You need SLR (Service Ledger Token) to purchase vouchers. You can get test SLR tokens from our faucet for demonstration purposes. Click the 'Get Faucet' button in the navbar."
  },
  {
    question: "How do I redeem a voucher?",
    answer: "Navigate to 'My Vouchers' page to see all vouchers you own. Select the voucher you want to redeem, choose the quantity, and click 'Redeem Now'. The voucher will be burned from your wallet. In Phase 3, we'll add QR code redemption at physical business locations."
  },
  {
    question: "Can I sell my vouchers to others?",
    answer: "Yes! Since vouchers are ERC1155 tokens, they can be transferred or sold to other users. You can use standard NFT marketplaces or transfer them directly to another wallet address."
  },
  {
    question: "How do businesses create vouchers?",
    answer: "Businesses need to register first by clicking 'Register Your Business' in the Business Dashboard. Once registered, they can create vouchers by filling in details like title, description, price, and initial supply. The vouchers are minted to the business owner's wallet."
  },
  {
    question: "Is this on mainnet?",
    answer: "Currently, Service Ledger is deployed on a test network for demonstration. This allows users to test all features without real money. Future plans include mainnet deployment on Ethereum, Arbitrum, and other chains."
  },
  {
    question: "What makes this different from traditional vouchers?",
    answer: "Traditional vouchers are centralized and can be easily counterfeited. Our blockchain-based vouchers are: 1) Verifiable on-chain, 2) Transferable between users, 3) Transparent (all transactions public), 4) No intermediaries needed, 5) Business gets paid instantly."
  },
  {
    question: "What's the technology stack?",
    answer: "Smart contracts are written in Solidity using OpenZeppelin standards (ERC1155 for vouchers, ERC20 for payment tokens). Frontend is built with Next.js, TypeScript, Wagmi, and RainbowKit. Metadata is stored on IPFS via Pinata."
  },
  {
    question: "What are the future plans?",
    answer: "Phase 3 includes QR code redemption at businesses, mobile app, analytics dashboard, multi-chain deployment, loyalty rewards program, and integration with existing POS systems."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
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
        Frequently Asked Questions
      </h2>
      <p style={{
        fontSize: '1.1rem',
        color: '#b0b0b0',
        textAlign: 'center',
        marginBottom: '4rem',
        maxWidth: '700px',
        margin: '0 auto 4rem'
      }}>
        Everything you need to know about Service Ledger
      </p>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {faqData.map((faq, index) => (
          <div
            key={index}
            style={{
              background: 'linear-gradient(to bottom, #1f1f1f 0%, #171717 100%)',
              borderRadius: '12px',
              border: openIndex === index 
                ? '1px solid rgba(255, 107, 53, 0.3)' 
                : '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              transition: 'all 0.3s'
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                width: '100%',
                padding: '1.5rem 2rem',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 107, 53, 0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#ffffff',
                flex: 1
              }}>
                {faq.question}
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: openIndex === index 
                  ? 'linear-gradient(135deg, #ff6b35 0%, #f77f00 100%)' 
                  : 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: '700',
                color: 'white',
                transition: 'all 0.3s',
                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)'
              }}>
                +
              </div>
            </button>
            
            <div style={{
              maxHeight: openIndex === index ? '500px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-in-out'
            }}>
              <div style={{
                padding: '0 2rem 1.5rem 2rem',
                fontSize: '1rem',
                color: '#b0b0b0',
                lineHeight: '1.7',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
