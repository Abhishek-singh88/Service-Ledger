import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { CONTRACTS } from '../../lib/contracts';

const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http()
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const tokenId = searchParams.get('tokenId');

  if (!address || !tokenId) {
    return NextResponse.json({ error: 'Address and tokenId required' }, { status: 400 });
  }

  try {
    const id = BigInt(tokenId);

    // Read user's balance
    const balance = await publicClient.readContract({
      ...CONTRACTS.localVouchers,
      functionName: 'balanceOf',
      args: [address as `0x${string}`, id]
    });

    // Read URI
    const uri = await publicClient.readContract({
      ...CONTRACTS.localVouchers,
      functionName: 'uri',
      args: [id]
    });

    // Read voucher data to get expiry
    const voucher = await publicClient.readContract({
      ...CONTRACTS.localVouchers,
      functionName: 'vouchers',
      args: [id]
    }) as [string, bigint, bigint, boolean];

    return NextResponse.json({
      balance: balance.toString(),
      uri,
      expiry: voucher[2].toString() // expiry is the 3rd element
    });
  } catch (error) {
    console.error('Error fetching user balance:', error);
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
}
