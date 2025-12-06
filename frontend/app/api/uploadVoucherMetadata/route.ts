import { NextRequest, NextResponse } from 'next/server';
import pinataSDK from '@pinata/sdk';

const pinata = pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_API_SECRET!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName,
      title,
      description,
      imageUrl,
      city,
      units,
      expiry
    } = body;

    const metadata = {
      name: `${title} - ${businessName}`,
      description,
      image: imageUrl,
      attributes: [
        { trait_type: 'Business', value: businessName },
        { trait_type: 'City', value: city },
        { trait_type: 'Units', value: String(units) },
        { trait_type: 'Expiry', value: expiry }
      ]
    };

    const result = await pinata.pinJSONToIPFS(metadata);
    const uri = `ipfs://${result.IpfsHash}`;

    return NextResponse.json({ uri }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Pinata upload failed' },
      { status: 500 }
    );
  }
}
