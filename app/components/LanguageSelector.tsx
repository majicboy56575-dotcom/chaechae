"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";
import { type SupportedLanguage } from "../lib/i18n/translations";

export default function LanguageSelector() {
  const { language, setLanguage, languages, currentLanguageInfo } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white/90 hover:bg-slate-50 border border-slate-200/80 shadow-sm backdrop-blur-sm transition-all active:scale-[0.98]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change Language"
      >
        <span className="text-sm">{currentLanguageInfo.flag}</span>
        <span className="hidden sm:inline">{currentLanguageInfo.nativeName}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-slate-100 py-1.5 z-50 animate-scale-up origin-top-right">
          <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100/80 mb-1">
            Language / 언어
          </div>
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                  isSelected
                    ? "bg-indigo-50/80 text-indigo-600 font-extrabold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
