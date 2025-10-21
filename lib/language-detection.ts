/**
 * Detects the user's language using multiple methods for accuracy
 */

interface LanguageDetectionResult {
  languageCode: string;
  confidence: 'high' | 'medium' | 'low';
  source: 'browser' | 'ip' | 'default';
}

/**
 * Gets language from browser APIs (Navigator language)
 */
function getBrowserLanguage(): string | null {
  if (typeof navigator === 'undefined') return null;

  // Try multiple browser language properties
  const language = navigator.language || (navigator.languages && navigator.languages[0]) || null;

  if (language) {
    // Extract ISO 639-1 language code (first 2 characters)
    return language.split('-')[0].toLowerCase();
  }

  return null;
}

/**
 * Fetches user's country/language based on IP using a free geolocation API
 */
async function getLanguageFromIP(): Promise<string | null> {
  try {
    // Using ipapi.co - free tier allows 1000 requests/day
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });

    if (!response.ok) {
      throw new Error('Failed to fetch IP location');
    }

    const data = await response.json();

    // Map country code to language
    // ipapi.co returns languages array or country_code
    if (data.languages) {
      // Format: "en,es" - take first language
      return data.languages.split(',')[0].toLowerCase();
    }

    if (data.country_code) {
      // Fallback: map common country codes to languages
      return mapCountryToLanguage(data.country_code);
    }

    return null;
  } catch (error) {
    console.warn('Failed to detect language from IP:', error);
    return null;
  }
}

/**
 * Maps country codes to primary language codes
 */
function mapCountryToLanguage(countryCode: string): string {
  const countryLanguageMap: Record<string, string> = {
    US: 'en',
    GB: 'en',
    CA: 'en',
    AU: 'en',
    NZ: 'en',
    IE: 'en',
    ES: 'es',
    MX: 'es',
    AR: 'es',
    CO: 'es',
    CL: 'es',
    PE: 'es',
    FR: 'fr',
    BE: 'fr',
    CH: 'fr',
    LU: 'fr',
    MC: 'fr',
    DE: 'de',
    AT: 'de',
    LI: 'de',
    IT: 'it',
    SM: 'it',
    VA: 'it',
    PT: 'pt',
    BR: 'pt',
    AO: 'pt',
    RU: 'ru',
    BY: 'ru',
    KZ: 'ru',
    CN: 'zh',
    TW: 'zh',
    HK: 'zh',
    SG: 'zh',
    JP: 'ja',
    KR: 'ko',
    SA: 'ar',
    AE: 'ar',
    EG: 'ar',
    MA: 'ar',
    IN: 'hi',
    PK: 'ur',
    BD: 'bn',
    TR: 'tr',
    NL: 'nl',
    PL: 'pl',
    SE: 'sv',
    NO: 'no',
    DK: 'da',
    FI: 'fi',
    GR: 'el',
    IL: 'he',
    TH: 'th',
    VN: 'vi',
    ID: 'id',
    PH: 'tl',
  };

  return countryLanguageMap[countryCode.toUpperCase()] || 'en';
}

/**
 * Main function to detect user's language with fallbacks
 */
export async function detectUserLanguage(): Promise<LanguageDetectionResult> {
  // Method 1: Try browser language (fastest and most accurate for user preference)
  const browserLang = getBrowserLanguage();
  if (browserLang) {
    return {
      languageCode: browserLang,
      confidence: 'high',
      source: 'browser',
    };
  }

  // Method 2: Try IP-based detection
  const ipLang = await getLanguageFromIP();
  if (ipLang) {
    return {
      languageCode: ipLang,
      confidence: 'medium',
      source: 'ip',
    };
  }

  // Method 3: Default to English
  return {
    languageCode: 'en',
    confidence: 'low',
    source: 'default',
  };
}

/**
 * Synchronous version that only uses browser API (use when you need immediate results)
 */
export function detectUserLanguageSync(): LanguageDetectionResult {
  const browserLang = getBrowserLanguage();

  if (browserLang) {
    return {
      languageCode: browserLang,
      confidence: 'high',
      source: 'browser',
    };
  }

  return {
    languageCode: 'en',
    confidence: 'low',
    source: 'default',
  };
}
