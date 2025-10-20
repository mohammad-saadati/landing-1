import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function POST(request: NextRequest) {
  try {
    const { roomName, participantName } = await request.json();

    // Get LiveKit Cloud credentials (FREE tier - no server needed!)
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.LIVEKIT_WS_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
      return NextResponse.json(
        { 
          error: 'LiveKit Cloud credentials not configured',
          help: 'Sign up for FREE at https://cloud.livekit.io/ and add credentials to .env.local'
        },
        { status: 500 }
      );
    }

    // Create access token for LiveKit Cloud (FREE)
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
      // Token expires in 6 hours
      ttl: '6h',
    });

    // Grant permissions
    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    });

    const token = await at.toJwt();

    return NextResponse.json({
      token,
      wsUrl,
      roomName,
      participantName,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
