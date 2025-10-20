'use client';

import LiveKitConnector from '@/components/LiveKitConnector';
import { useLanguageDetection } from '@/hooks/useLanguageDetection';

export default function Home() {
  const { languageInfo, isLoading } = useLanguageDetection();
  
  return (
    <div className="relative">
      {/* Language Detection Display */}
      {/* <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm z-50">
        <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200 mb-2">
          🌍 Language Detection
        </h3>
        {isLoading ? (
          <p className="text-xs text-gray-500">Detecting...</p>
        ) : languageInfo ? (
          <div className="space-y-1 text-xs">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Language:</span>{' '}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {languageInfo.language.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Browser Locale:</span> {languageInfo.fullLocale}
            </p>
            {languageInfo.actualCountry && (
              <>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">📍 Actual Location:</span>{' '}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {languageInfo.actualCountry}
                  </span>
                  {languageInfo.city && ` (${languageInfo.city})`}
                </p>
              </>
            )}
            <p className="text-gray-500 dark:text-gray-400 text-[10px] mt-2">
              IP-based geolocation
            </p>
          </div>
        ) : (
          <p className="text-xs text-red-500">Detection failed</p>
        )}
      </div> */}

      {/* LiveKit Connector - automatically generates token and connects */}
      <LiveKitConnector 
        roomName="demo-room"
      />
    </div>
  );
}
