import { NextRequest, NextResponse } from 'next/server';
import pinataSDK from '@pinata/sdk';

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_API_SECRET!
);

export async function POST(req: NextRequest) {
  const { businessName, title, description, imageUrl, city, units, expiry } = await req.json();

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

  try {
    const result = await pinata.pinJSONToIPFS(metadata);
    return NextResponse.json({ uri: `ipfs://${result.IpfsHash}` });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
