'use client';

import { useState, useEffect } from 'react';

interface LanguageInfo {
  language: string;
  fullLocale: string;
  country: string | null;
  detectionMethod: 'browser' | 'ip' | 'default';
  actualCountry?: string | null;
  city?: string | null;
}

export function useLanguageDetection() {
  const [languageInfo, setLanguageInfo] = useState<LanguageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function detectLanguage() {
      try {
        let browserLanguage = 'en';
        let fullLocale = 'en-US';
        let localeCountry = null;

        // Method 1: Get browser language preference
        if (typeof navigator !== 'undefined' && navigator.language) {
          fullLocale = navigator.language;
          browserLanguage = fullLocale.split('-')[0];
          localeCountry = fullLocale.split('-')[1] || null;
        }

        // Method 2: Get ACTUAL location from IP (always run this)
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();

          setLanguageInfo({
            language: browserLanguage,
            fullLocale,
            country: localeCountry,
            actualCountry: data.country_code || null,
            city: data.city || null,
            detectionMethod: 'browser'
          });
          setIsLoading(false);
          return;
        } catch (ipError) {
          // If IP detection fails, just use browser info
          setLanguageInfo({
            language: browserLanguage,
            fullLocale,
            country: localeCountry,
            actualCountry: null,
            city: null,
            detectionMethod: 'browser'
          });
          setIsLoading(false);
          return;
        }

      } catch (error) {
        console.error('Language detection failed:', error);
        setLanguageInfo({
          language: 'en',
          fullLocale: 'en-US',
          country: null,
          actualCountry: null,
          city: null,
          detectionMethod: 'default'
        });
        setIsLoading(false);
      }
    }

    detectLanguage();
  }, []);

  return { languageInfo, isLoading };
}

