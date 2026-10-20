'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { audioService, SpeechRecognitionResultDiff } from '@/lib/audio';

interface SpeechInputProps {
  expectedText: string;
  onResult?: (diff: SpeechRecognitionResultDiff) => void;
  className?: string;
}

export function SpeechInput({ expectedText, onResult, className = '' }: SpeechInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [diffResult, setDiffResult] = useState<SpeechRecognitionResultDiff | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'de-DE';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
        const diff = audioService.compareGermanSpeech(expectedText, transcript);
        setDiffResult(diff);
        onResult?.(diff);
      };

      rec.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [expectedText, onResult]);

  const toggleListening = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setRecognizedText('');
      setDiffResult(null);
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    }
  };

  const handleReset = () => {
    setRecognizedText('');
    setDiffResult(null);
  };

  return (
    <div className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleListening}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-md shadow-red-500/20'
                : 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95 shadow-sm'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 animate-bounce" />
                <span>Listening... (Speak German)</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Tap to Record Your Pronunciation</span>
              </>
            )}
          </button>

          {diffResult && (
            <button
              type="button"
              onClick={handleReset}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg"
              title="Try again"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>

        {diffResult && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              diffResult.accuracyScore >= 80
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                : diffResult.accuracyScore >= 50
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
            }`}
          >
            {diffResult.accuracyScore >= 80 ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5" />
            )}
            <span>{diffResult.accuracyScore}% Accuracy</span>
          </div>
        )}
      </div>

      {!isSupported && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          Note: Web Speech Recognition is best experienced in Google Chrome, Microsoft Edge, or Safari on desktop/mobile.
        </p>
      )}

      {recognizedText && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Recognized Words:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {diffResult?.wordsDiff.map((item, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded text-sm font-medium ${
                  item.matched
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 line-through'
                }`}
              >
                {item.recognized || item.expected}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
