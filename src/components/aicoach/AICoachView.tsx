import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, ChatMessage } from '../../types';
import { StorageService } from '../../services/storageService';
import { AIService } from '../../services/aiService';
import {
  Sparkles,
  Send,
  Trash2,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Target,
  Zap,
} from 'lucide-react';

interface AICoachViewProps {
  userProfile: UserProfile;
}

export const AICoachView: React.FC<AICoachViewProps> = ({ userProfile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<{ configured: boolean }>({ configured: true });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(StorageService.getChatHistory());
    AIService.checkHealth().then((res) => {
      setAiStatus({ configured: res.aiConfigured });
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const suggestedQuestions = [
    'How can I build muscle with Indian vegetarian food?',
    'Create an efficient 4-day gym split for my goal',
    `How much protein do I need for ${userProfile.weight}kg bodyweight?`,
    'Proper barbell squat form and common safety mistakes',
    'Tips to improve my workout recovery and sleep quality',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputValue).trim();
    if (!prompt || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    StorageService.saveChatHistory(newMessages);
    setInputValue('');
    setIsLoading(true);

    // Call server AI endpoint
    const historyPayload = newMessages.map((m) => ({ role: m.role, content: m.content }));
    const result = await AIService.askCoach(historyPayload, userProfile);

    const assistantMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: result.reply,
      timestamp: new Date().toISOString(),
      isDemo: result.isDemo,
    };

    const updated = [...newMessages, assistantMsg];
    setMessages(updated);
    StorageService.saveChatHistory(updated);
    setIsLoading(false);
  };

  const handleClearHistory = () => {
    const defaultMsg: ChatMessage[] = [
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `Chat history reset. Ready to optimize your workouts and nutrition, ${userProfile.name.split(' ')[0]}! What are we focusing on?`,
        timestamp: new Date().toISOString(),
        isDemo: false,
      },
    ];
    setMessages(defaultMsg);
    StorageService.saveChatHistory(defaultMsg);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-20 md:pb-8 flex flex-col h-[calc(100vh-130px)]">
      {/* Top Coach Header & Safety Banner */}
      <div className="p-4 rounded-2xl bg-[#171924] border border-[#272B3C] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9B7BFF] to-[#C6FF4D] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#101116] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#9B7BFF]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-[#F5F6FA]">DENT ZYM AI Fitness Coach</h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#9B7BFF]/20 text-[#9B7BFF] border border-[#9B7BFF]/30">
                {aiStatus.configured ? 'Gemini 3.8 Flash' : 'Built-in Engine'}
              </span>
            </div>
            <p className="text-[11px] text-[#A4A7B2]">
              Goal: <span className="text-[#C6FF4D] font-semibold">{userProfile.goal}</span> · {userProfile.diet} · {userProfile.location}
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          title="Clear Conversation"
          className="p-2 rounded-xl bg-[#202330] border border-[#2B2F40] text-[#A4A7B2] hover:text-[#FF6B6B] transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Safety Notice */}
      <div className="px-3.5 py-1.5 rounded-xl bg-[#181922] border border-[#262835] text-[11px] text-[#A4A7B2] flex items-center gap-2 shrink-0">
        <AlertCircle className="w-3.5 h-3.5 text-[#9B7BFF] shrink-0" />
        <span>
          DENT ZYM Coach provides fitness and sports nutrition guidance. It does not provide medical diagnoses or prescriptions.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 p-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#C6FF4D] text-[#101116] font-medium rounded-tr-none shadow-md'
                  : 'bg-[#181A25] border border-[#292D3E] text-[#F5F6FA] rounded-tl-none shadow-md'
              }`}
            >
              {/* Optional Demo Notice on Assistant message */}
              {msg.role === 'assistant' && msg.isDemo && (
                <div className="mb-2 pb-1.5 border-b border-[#2B2F40] text-[10px] text-[#C6FF4D] flex items-center gap-1 font-semibold uppercase tracking-wider">
                  <Zap className="w-3 h-3 text-[#C6FF4D]" />
                  <span>DENT ZYM High-Performance Protocol (Demo Engine)</span>
                </div>
              )}

              {/* Message text with basic markdown formatting */}
              <div className="whitespace-pre-wrap space-y-2">
                {msg.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div
                className={`text-[9px] mt-2 text-right ${
                  msg.role === 'user' ? 'text-[#101116]/60' : 'text-[#6B7082]'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#181A25] border border-[#292D3E] rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9B7BFF] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#C6FF4D] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#9B7BFF] animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-[#A4A7B2] ml-2">DENT ZYM Coach analyzing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="shrink-0 flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-3 py-1.5 rounded-full bg-[#181A24] border border-[#2B2E3E] text-[11px] text-[#A4A7B2] hover:text-[#F5F6FA] hover:border-[#9B7BFF]/50 whitespace-nowrap transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 shrink-0 bg-[#171923] p-2 rounded-2xl border border-[#282C3D]"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask about training, sets, Indian recipes, macros...`}
          disabled={isLoading}
          className="flex-1 px-3 py-2 bg-transparent text-xs text-[#F5F6FA] placeholder-[#555A6E] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="w-9 h-9 rounded-xl bg-[#C6FF4D] text-[#101116] flex items-center justify-center hover:bg-[#d5ff73] disabled:opacity-40 transition-all cursor-pointer shadow-md shadow-[#C6FF4D]/10"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
