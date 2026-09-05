"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  type SupportedLanguage,
  type LanguageInfo,
  SUPPORTED_LANGUAGES,
  translations,
} from "./translations";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof typeof translations.ko) => string;
  languages: LanguageInfo[];
  currentLanguageInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "chae_chae_selected_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("ms");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage | null;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        setLanguageState(saved);
      } else {
        // Check browser language
        const browserLang = navigator.language.slice(0, 2).toLowerCase();
        const matched = SUPPORTED_LANGUAGES.find((l) => l.code === browserLang);
        if (matched) {
          setLanguageState(matched.code);
        } else {
          setLanguageState("ms");
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const t = (key: keyof typeof translations.ms): string => {
    const langDict = translations[language] || translations.ms;
    return (langDict[key] as string) || (translations.ms[key] as string) || key;
  };

  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || 
    SUPPORTED_LANGUAGES.find((l) => l.code === "ms") || 
    SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageInfo,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
