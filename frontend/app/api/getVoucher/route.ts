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
  const tokenId = searchParams.get('tokenId');

  if (!tokenId) {
    return NextResponse.json({ error: 'Token ID required' }, { status: 400 });
  }

  try {
    const id = BigInt(tokenId);

    // Read voucher data
    const voucher = await publicClient.readContract({
      ...CONTRACTS.localVouchers,
      functionName: 'vouchers',
      args: [id]
    }) as [string, bigint, bigint, boolean];

    // Read URI
    const uri = await publicClient.readContract({
      ...CONTRACTS.localVouchers,
      functionName: 'uri',
      args: [id]
    });

    // Read business balance (remaining units)
    const remainingUnits = await publicClient.readContract({
      ...CONTRACTS.localVouchers,
      functionName: 'balanceOf',
      args: [voucher[0], id]
    });

    return NextResponse.json({
      business: voucher[0],
      price: voucher[1].toString(),
      expiry: voucher[2].toString(),
      active: voucher[3],
      uri,
      remainingUnits: remainingUnits.toString()
    });
  } catch (error) {
    console.error('Error fetching voucher:', error);
    return NextResponse.json({ error: 'Voucher not found' }, { status: 404 });
  }
}
