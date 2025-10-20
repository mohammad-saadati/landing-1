'use client';

import { useState, useEffect } from 'react';
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import VoiceActivityCircle from './VoiceActivityCircle';
import LiveKitVoiceCircle from './LiveKitVoiceCircle';

interface LiveKitConnectorProps {
  roomName?: string;
  participantName?: string;
}

export default function LiveKitConnector({ 
  roomName = 'my-room', 
  participantName 
}: LiveKitConnectorProps = {}) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [serverUrl, setServerUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [micEnabled, setMicEnabled] = useState(false);
  const [isCircleActive, setIsCircleActive] = useState(false);
  
  // Generate a random participant name ONCE if not provided
  const [finalParticipantName] = useState(() => 
    participantName || `user-${Math.random().toString(36).substring(7)}`
  );

  const handleLetsTalk = async () => {
    try {
      // Activate circle animation
      setIsCircleActive(true);
      
      // Make API call to your endpoint
      const response = await fetch('/api/start-conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'start',
        }),
      });

      if (!response.ok) {
        console.error('Failed to start conversation');
      }
      
      // You can deactivate after some time or based on the response
      // setTimeout(() => setIsCircleActive(false), 5000);
    } catch (err) {
      console.error('Error starting conversation:', err);
      setIsCircleActive(false);
    }
  };

  useEffect(() => {
    async function fetchToken() {
      try {
        setIsConnecting(true);
        setError(null);

        const response = await fetch('/api/livekit-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomName,
            participantName: finalParticipantName,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get token');
        }

        const data = await response.json();
        setToken(data.token);
        setServerUrl(data.wsUrl);
      } catch (err) {
        console.error('Error fetching token:', err);
        setError(err instanceof Error ? err.message : 'Failed to connect');
        setIsConnecting(false);
      }
    }

    fetchToken();
  }, [roomName, finalParticipantName]);

  // Don't render LiveKitRoom until we have a token
  if (!token && !error) {
    return <></>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center max-w-md">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Connection Failed
            </h2>
            <p className="text-sm text-red-600">{error}</p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-700 font-semibold mb-2">
                🆓 FREE Solution - No Server Needed!
              </p>
              <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                <li>Sign up FREE at <a href="https://cloud.livekit.io/" target="_blank" className="text-blue-600 underline">cloud.livekit.io</a></li>
                <li>Copy your credentials from dashboard</li>
                <li>Add them to .env.local file</li>
                <li>Restart dev server</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        {isConnecting && !isConnected && (
          <div className="flex flex-col items-center gap-8">
            <VoiceActivityCircle size={220} isActive={isCircleActive} />
            
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="font-bold" style={{ color: '#2D2C2B', fontSize: '56px' }}>
                  Kai
                </h1>
                <p style={{ color: '#6C6B6A', fontSize: '34px' }}>
                  Your Personal Language Tutor
                </p>
              </div>
              
              <button
                onClick={handleLetsTalk}
                className="px-12 py-4 rounded-full font-semibold transition-all shadow-lg text-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                style={{ 
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  outline: 'none'
                }}
              >
                Let's Talk
              </button>
            </div>
          </div>
        )}

        <LiveKitRoom
          token={token!}
          serverUrl={serverUrl}
          connect={true}
          onConnected={() => {
            setIsConnected(true);
            setIsConnecting(false);
          }}
          onDisconnected={() => {
            setIsConnected(false);
            setIsConnecting(true);
          }}
          audio={micEnabled}
          video={false}
          options={{
            audioCaptureDefaults: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          }}
        >
          <RoomAudioRenderer />
          
          {isConnected && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-12">
              {/* Voice Activity Circle Animation */}
              <LiveKitVoiceCircle size={220} />
              
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h1 className="font-bold" style={{ color: '#2D2C2B', fontSize: '56px' }}>
                    Kai
                  </h1>
                  <p style={{ color: '#6C6B6A', fontSize: '34px' }}>
                    Your Personal Language Tutor
                  </p>
                </div>
                
                {/* Microphone Control */}
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`px-8 py-4 rounded-full font-medium transition-all shadow-xl text-lg ${
                    micEnabled 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {micEnabled ? '🔇 Mute Microphone' : '🎤 Enable Microphone'}
                </button>
              </div>
            </div>
          )}
        </LiveKitRoom>
      </div>
    </div>
  );
}

