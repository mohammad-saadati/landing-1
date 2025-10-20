'use client';

import { useEffect, useState } from 'react';
import { useLocalParticipant } from '@livekit/components-react';
import VoiceActivityCircle from './VoiceActivityCircle';

interface LiveKitVoiceCircleProps {
  size?: number;
}

export default function LiveKitVoiceCircle({ size = 220 }: LiveKitVoiceCircleProps) {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Monitor speaking state from local participant
  useEffect(() => {
    if (!localParticipant || !isMicrophoneEnabled) {
      setIsSpeaking(false);
      return;
    }

    let intervalId: NodeJS.Timeout;

    const startMonitoring = () => {
      intervalId = setInterval(() => {
        const speaking = localParticipant.isSpeaking;
        setIsSpeaking(speaking);
      }, 100);
    };

    startMonitoring();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [localParticipant, isMicrophoneEnabled]);

  const isActive = isMicrophoneEnabled && isSpeaking;

  return <VoiceActivityCircle size={size} isActive={isActive} />;
}

