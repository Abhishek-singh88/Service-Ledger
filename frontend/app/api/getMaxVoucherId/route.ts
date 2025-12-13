import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { CONTRACTS } from '../../lib/contracts';

const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http()
});

export async function GET() {
  try {
    const nextVoucherId = await publicClient.readContract({
      ...CONTRACTS.localVouchers,
      functionName: 'nextVoucherId'
    }) as bigint;

    return NextResponse.json({
      maxVoucherId: Number(nextVoucherId) - 1
    });
  } catch (error) {
    console.error('Error fetching max voucher ID:', error);
    return NextResponse.json({ error: 'Failed to fetch max voucher ID' }, { status: 500 });
  }
}
