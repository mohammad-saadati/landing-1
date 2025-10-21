import { NextResponse } from 'next/server';

type ConnectionDetails = {
  serverUrl: string;
  roomName: string;
  participantName: string;
  participantToken: string;
};

// NOTE: you are expected to define the following environment variables in `.env.local`:
const LIVEKIT_URL = process.env.LIVEKIT_URL;
const KAISTORY_API_URL =
  process.env.KAISTORY_API_URL || 'https://api.kaistory.ai/internal/guest/token/';

// don't cache the results
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    if (LIVEKIT_URL === undefined) {
      throw new Error('LIVEKIT_URL is not defined');
    }

    // Parse request body
    const body = await req.json();

    // Get language from request body, default to 'en'
    const languageCode: string = body?.language_code || 'en';

    // Generate participant info
    const participantName = 'client from site';
    const roomName = `voice_assistant_room_${Math.floor(Math.random() * 10_000)}`;

    // Call the external API to get the token with detected language
    const participantToken = await fetchTokenFromKaistory(participantName, languageCode);

    // Return connection details
    const data: ConnectionDetails = {
      serverUrl: LIVEKIT_URL,
      roomName,
      participantToken: participantToken,
      participantName,
    };
    const headers = new Headers({
      'Cache-Control': 'no-store',
    });
    return NextResponse.json(data, { headers });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new NextResponse(error.message, { status: 500 });
    }
  }
}

async function fetchTokenFromKaistory(name: string, languageCode: string): Promise<string> {
  try {
    const response = await fetch(KAISTORY_API_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        language_code: languageCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // The API response structure - adjust this based on the actual response
    // Common patterns: { token: "..." } or { access_token: "..." } or { data: { token: "..." } }
    const token = data.token || data.access_token || data.data?.token || data;

    if (typeof token !== 'string') {
      throw new Error('Invalid token response from Kaistory API');
    }

    return token;
  } catch (error) {
    console.error('Error fetching token from Kaistory API:', error);
    throw new Error('Failed to retrieve token from Kaistory API');
  }
}
