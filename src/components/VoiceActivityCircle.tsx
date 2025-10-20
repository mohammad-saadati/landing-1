'use client';

import { useEffect, useState } from 'react';

interface VoiceActivityCircleProps {
  size?: number;
  isActive?: boolean; // Control animation state (for when outside Room context)
}

export default function VoiceActivityCircle({ size = 200, isActive = false }: VoiceActivityCircleProps) {
  const isListening = isActive;

  return (
    <div className="flex items-center justify-center">
      <style>{`
        @keyframes cloudySwirl {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        @keyframes dustParticle1 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(30px, -60px);
          }
        }

        @keyframes dustParticle2 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-40px, -50px);
          }
        }

        @keyframes dustParticle3 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(50px, -30px);
          }
        }

        @keyframes dustParticle4 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50px, -40px);
          }
        }

        .voice-circle {
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          position: relative;
          transition: transform 0.3s ease;
          box-shadow: 0 10px 40px rgba(255, 165, 22, 0.3);
        }

        .voice-circle:hover {
          transform: scale(1.05);
        }

        .voice-circle-base {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(180deg, #FFD89B 0%, #FFB84D 25%, #FFA940 50%, #FF9A3D 75%, #FF8A65 100%);
          background-size: 200% 200%;
          animation: ${isListening ? 'cloudySwirl 4s ease-in-out infinite' : 'none'};
          position: relative;
          overflow: visible;
        }

        .dust-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          pointer-events: none;
        }

        .dust-1 {
          width: 4px;
          height: 4px;
          bottom: 50%;
          left: 50%;
          animation: ${isListening ? 'dustParticle1 1.2s ease-out infinite' : 'none'};
          animation-delay: 0s;
          visibility: ${isListening ? 'visible' : 'hidden'};
        }

        .dust-2 {
          width: 3px;
          height: 3px;
          bottom: 50%;
          left: 50%;
          animation: ${isListening ? 'dustParticle2 1.2s ease-out infinite' : 'none'};
          animation-delay: 0.3s;
          visibility: ${isListening ? 'visible' : 'hidden'};
        }

        .dust-3 {
          width: 5px;
          height: 5px;
          bottom: 50%;
          left: 50%;
          animation: ${isListening ? 'dustParticle3 1.2s ease-out infinite' : 'none'};
          animation-delay: 0.6s;
          visibility: ${isListening ? 'visible' : 'hidden'};
        }

        .dust-4 {
          width: 3px;
          height: 3px;
          bottom: 50%;
          left: 50%;
          animation: ${isListening ? 'dustParticle4 1.2s ease-out infinite' : 'none'};
          animation-delay: 0.9s;
          visibility: ${isListening ? 'visible' : 'hidden'};
        }

        .dust-5 {
          width: 4px;
          height: 4px;
          bottom: 50%;
          left: 50%;
          animation: ${isListening ? 'dustParticle1 1.2s ease-out infinite' : 'none'};
          animation-delay: 1.2s;
          visibility: ${isListening ? 'visible' : 'hidden'};
        }

        .dust-6 {
          width: 2px;
          height: 2px;
          bottom: 50%;
          left: 50%;
          animation: ${isListening ? 'dustParticle3 1.2s ease-out infinite' : 'none'};
          animation-delay: 1.5s;
          visibility: ${isListening ? 'visible' : 'hidden'};
        }

        .pulse-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(255, 165, 22, 0.4);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .pulse-ring:nth-child(1) {
          width: ${size + 40}px;
          height: ${size + 40}px;
          animation: ${isListening ? 'pulse 1.5s ease-out infinite' : 'none'};
        }

        .pulse-ring:nth-child(2) {
          width: ${size + 80}px;
          height: ${size + 80}px;
          animation: ${isListening ? 'pulse 1.5s ease-out infinite 0.5s' : 'none'};
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>

      <div className="relative">
        <div className="voice-circle">
          <div className="voice-circle-base">
          </div>
        </div>
      </div>
    </div>
  );
}
