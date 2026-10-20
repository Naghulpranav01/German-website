'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CONVERSATION_SCENARIOS, getSimulatedTutorResponse } from '@/data/scenarios';
import { ConversationScenario } from '@/types';
import { AudioButton } from '@/components/ui/AudioButton';
import { SpeechInput } from '@/components/ui/SpeechInput';
import { useLearnerStore } from '@/lib/store';
import {
  BotMessageSquare,
  Send,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  User,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  germanText: string;
  englishTranslation?: string;
  feedback?: string;
  suggestedNext?: string;
}

export default function AITutorPage() {
  const [activeScenario, setActiveScenario] = useState<ConversationScenario>(CONVERSATION_SCENARIOS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);

  const { store } = useLearnerStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation when scenario changes
  useEffect(() => {
    setMessages([
      {
        id: 'msg_0',
        sender: 'ai',
        germanText: activeScenario.openingGerman,
        englishTranslation: activeScenario.openingEnglish,
      },
    ]);
    setCompletedObjectives([]);
    setShowHints(false);
  }, [activeScenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      germanText: text,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');

    // Generate tutor reply and linguistic corrections
    const tutorResponse = getSimulatedTutorResponse(activeScenario.id, text);

    setTimeout(() => {
      const aiReply: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        germanText: tutorResponse.germanResponse,
        feedback: tutorResponse.englishFeedback,
        suggestedNext: tutorResponse.suggestedNextStep,
      };
      setMessages((prev) => [...prev, aiReply]);

      // Progressively check objectives
      if (completedObjectives.length < activeScenario.objectives.length) {
        setCompletedObjectives((prev) => [
          ...prev,
          activeScenario.objectives[prev.length],
        ]);
        store.completeLesson(`tutor_${activeScenario.id}`, 20);
      }
    }, 600);
  };

  const handleResetConversation = () => {
    setMessages([
      {
        id: 'msg_0',
        sender: 'ai',
        germanText: activeScenario.openingGerman,
        englishTranslation: activeScenario.openingEnglish,
      },
    ]);
    setCompletedObjectives([]);
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-1.5">
              <BotMessageSquare className="w-3.5 h-3.5" />
              <span>Contextual AI Dialogue & Grammar Corrections</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              German Conversation Tutor
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Practice real spoken scenarios with interactive roleplay, audio playback, and immediate English explanations of mistakes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetConversation}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restart Dialogue</span>
          </button>
        </div>

        {/* 16 Scenarios Quick Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CONVERSATION_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => setActiveScenario(sc)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeScenario.id === sc.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="px-1 py-0.2 rounded text-[9px] bg-black/10 dark:bg-white/10 font-black">
                {sc.level}
              </span>
              <span>{sc.title}</span>
            </button>
          ))}
        </div>

        {/* Chat Room Layout: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Feed (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col h-[600px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            {/* Scenario Header Bar */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {activeScenario.aiRole}
                  </span>
                  <span className="text-xs text-slate-400">· Level {activeScenario.level}</span>
                </div>
                <p className="text-[11px] text-slate-500">{activeScenario.context}</p>
              </div>

              <button
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHints ? 'Hide Hints' : 'Need Hints?'}</span>
              </button>
            </div>

            {/* Scrollable Message History */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl space-y-1.5 ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-white rounded-tr-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-sm md:text-base leading-relaxed">
                        {msg.germanText}
                      </p>
                      <AudioButton
                        text={msg.germanText}
                        size="sm"
                        className={msg.sender === 'user' ? 'text-white' : ''}
                      />
                    </div>

                    {msg.englishTranslation && (
                      <p className="text-xs opacity-80 italic border-t border-black/10 dark:border-white/10 pt-1">
                        {msg.englishTranslation}
                      </p>
                    )}
                  </div>

                  {/* Feedback annotation on AI message */}
                  {msg.feedback && (
                    <div className="max-w-[85%] mt-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-300">
                      <strong>Tutor Advice: </strong> {msg.feedback}
                      {msg.suggestedNext && (
                        <span className="block italic text-blue-700 dark:text-blue-400 mt-0.5">
                          Suggested next: {msg.suggestedNext}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Hints Box */}
            {showHints && (
              <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 bg-amber-50/60 dark:bg-amber-950/20 space-y-1.5 animate-in fade-in duration-150">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block">
                  Click a suggested phrase to use it:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeScenario.suggestedPhrases.map((sp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(sp.german)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-left transition-colors cursor-pointer"
                    >
                      <span>{sp.german}</span>{' '}
                      <span className="text-[10px] text-slate-400 italic">({sp.english})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form with Text & Voice Input */}
            <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your German response (e.g. Ich hätte gern...)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-bold transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Col: Scenario Objectives & Cultural Notes */}
          <div className="space-y-5">
            {/* Objectives */}
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Scenario Objectives:
                </h3>
                <span className="text-xs font-bold text-amber-600">
                  {completedObjectives.length} / {activeScenario.objectives.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {activeScenario.objectives.map((obj, i) => {
                  const isDone = completedObjectives.includes(obj);
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-colors ${
                        isDone
                          ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${isDone ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'}`}
                      />
                      <span>{obj}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cultural Context Card */}
            <div className="p-6 rounded-3xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 shadow-xs space-y-2 text-xs">
              <strong className="text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>German Pragmatics & Register:</span>
              </strong>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                In scenarios involving officials, landlords, doctors, or new employers, remember to always use the formal <strong>„Sie“</strong> address and state requests politely with <strong>„könnten Sie bitte“</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
