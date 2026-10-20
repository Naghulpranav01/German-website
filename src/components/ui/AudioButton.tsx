'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2, Snail } from 'lucide-react';
import { audioService } from '@/lib/audio';
import { useLearnerStore } from '@/lib/store';

interface AudioButtonProps {
  text: string;
  slowText?: string;
  size?: 'sm' | 'md' | 'lg';
  showSlowButton?: boolean;
  className?: string;
  label?: string;
}

export function AudioButton({
  text,
  size = 'md',
  showSlowButton = true,
  className = '',
  label,
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlowPlaying, setIsSlowPlaying] = useState(false);
  const { profile } = useLearnerStore();

  const handlePlay = (e: React.MouseEvent, rate = 1.0, isSlow = false) => {
    e.stopPropagation();
    if (!audioService.isSupported()) {
      alert('Speech audio is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isSlow) {
      setIsSlowPlaying(true);
    } else {
      setIsPlaying(true);
    }

    const effectiveRate = isSlow ? 0.72 : (profile.speechSpeed || 1.0);

    audioService.speak(text, {
      rate: effectiveRate,
      onEnd: () => {
        setIsPlaying(false);
        setIsSlowPlaying(false);
      },
      onError: () => {
        setIsPlaying(false);
        setIsSlowPlaying(false);
      },
    });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1',
    md: 'p-2 text-sm gap-1.5',
    lg: 'p-3 text-base gap-2',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={(e) => handlePlay(e, profile.speechSpeed || 1.0, false)}
        disabled={isPlaying || isSlowPlaying}
        title="Listen to German pronunciation"
        aria-label="Listen to German pronunciation"
        className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer ${sizeClasses} ${
          isPlaying
            ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 ring-2 ring-amber-400'
            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 active:scale-95'
        }`}
      >
        {isPlaying ? (
          <Loader2 className={`${iconSizes} animate-spin text-amber-600`} />
        ) : (
          <Volume2 className={`${iconSizes} text-amber-600 dark:text-amber-400`} />
        )}
        {label && <span>{label}</span>}
      </button>

      {showSlowButton && (
        <button
          type="button"
          onClick={(e) => handlePlay(e, 0.72, true)}
          disabled={isPlaying || isSlowPlaying}
          title="Play slowly (0.75x speed)"
          aria-label="Play German audio slowly"
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            isSlowPlaying
              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 ring-2 ring-amber-400'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {isSlowPlaying ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
          ) : (
            <Snail className="w-3.5 h-3.5 text-slate-500 hover:text-amber-600 dark:text-slate-400" />
          )}
        </button>
      )}
    </div>
  );
}
