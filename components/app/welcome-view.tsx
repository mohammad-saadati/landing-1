'use client';

import { VoiceVisualizer } from '@/components/app/voice-visualizer';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref} className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <section className="flex flex-col items-center justify-center text-center">
        {/* Voice Visualizer */}
        <div className="mb-8">
          <VoiceVisualizer />
        </div>

        {/* Kai Title */}
        <h1 className="mb-4 text-6xl font-bold text-gray-900 md:text-7xl">Kai</h1>

        {/* Subtitle */}
        <p className="mb-16 text-xl font-light text-gray-600 md:text-2xl">
          Your Personal Language Tutor
        </p>

        {/* Let's Talk Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={onStartCall}
          className="transform rounded-full bg-black px-12 py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:shadow-xl"
        >
          Let&apos;s Talk
        </Button>
      </section>
    </div>
  );
};
