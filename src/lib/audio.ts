// Universal German Voice and Audio Service for DeutschPath

export interface TTSOptions {
  rate?: number; // 0.75 for slow, 1.0 for standard
  pitch?: number;
  voiceName?: string;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

export interface SpeechRecognitionResultDiff {
  expectedText: string;
  recognizedText: string;
  accuracyScore: number; // 0 - 100
  wordsDiff: {
    expected: string;
    recognized: string;
    matched: boolean;
  }[];
}

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isVoiceLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    // Prefer high quality de-DE voices
    const germanVoices = this.voices.filter((v) => v.lang.startsWith('de') || v.lang.includes('DE'));
    if (germanVoices.length > 0) {
      // Prefer Google or Microsoft or Natural voices if available
      this.selectedVoice =
        germanVoices.find((v) => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Hedda') || v.name.includes('Katja')) ||
        germanVoices[0];
      this.isVoiceLoaded = true;
    }
  }

  public getAvailableGermanVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices().filter((v) => v.lang.startsWith('de') || v.lang.includes('DE'));
  }

  public speak(text: string, options: TTSOptions = {}) {
    if (typeof window === 'undefined') return;

    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      options.onError?.(new Error('Speech synthesis not supported'));
      return;
    }

    // Cancel current speaking
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = options.rate ?? 1.0;
    utterance.pitch = options.pitch ?? 1.0;

    if (!this.selectedVoice && this.voices.length === 0) {
      this.loadVoices();
    }

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      options.onError?.(e);
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public isRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  // Calculate similarity and word-by-word diff between expected German and spoken input
  public compareGermanSpeech(expected: string, spoken: string): SpeechRecognitionResultDiff {
    const clean = (str: string) =>
      str
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
        .trim();

    const cleanExpected = clean(expected);
    const cleanSpoken = clean(spoken);

    const expWords = cleanExpected.split(/\s+/).filter(Boolean);
    const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);

    let matchCount = 0;
    const wordsDiff: SpeechRecognitionResultDiff['wordsDiff'] = [];

    const maxLen = Math.max(expWords.length, spokenWords.length);

    for (let i = 0; i < expWords.length; i++) {
      const expWord = expWords[i];
      const spWord = spokenWords[i] || '';
      const matched = expWord === spWord;
      if (matched) matchCount++;
      wordsDiff.push({
        expected: expWord,
        recognized: spWord,
        matched,
      });
    }

    // If spoken has extra words
    for (let j = expWords.length; j < spokenWords.length; j++) {
      wordsDiff.push({
        expected: '',
        recognized: spokenWords[j],
        matched: false,
      });
    }

    const accuracyScore = maxLen > 0 ? Math.round((matchCount / expWords.length) * 100) : 0;

    return {
      expectedText: expected,
      recognizedText: spoken,
      accuracyScore: Math.min(100, Math.max(0, accuracyScore)),
      wordsDiff,
    };
  }
}

export const audioService = new AudioService();
