import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Crown, Check, Zap, Sparkles, ShieldCheck, X } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onTogglePremium: (isPremium: boolean) => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onTogglePremium,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  if (!isOpen) return null;

  const features = [
    { name: 'Full Exercise Catalog & Form Cues', free: true, pro: true },
    { name: 'Live Set Tracker & Rest Timers', free: true, pro: true },
    { name: 'Indian Food Nutrition & Macro Logging', free: true, pro: true },
    { name: 'Unlimited Gemini 3.8 AI Coach Queries', free: false, pro: true },
    { name: 'Advanced Muscle Hypertrophy Analytics', free: false, pro: true },
    { name: 'Custom Routine Builder & Periodization', free: false, pro: true },
    { name: 'Personal Records (PR) Progression Charts', free: false, pro: true },
    { name: 'Priority VIP Cloud Sync & Data Export', free: false, pro: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#181A25] border border-[#2D3144] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden animate-scaleUp">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#9B7BFF]/15 to-[#C6FF4D]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9B7BFF] to-[#C6FF4D] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#101116] rounded-[10px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#C6FF4D]" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-[#F5F6FA]">DENT ZYM Pro VIP</h2>
              <span className="text-[11px] text-[#A4A7B2]">
                Unleash the full potential of your physique
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-lg font-bold text-[#6B7082] hover:text-[#F5F6FA] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Billing cycle toggle */}
        <div className="my-5 p-1 bg-[#12131A] border border-[#262A3B] rounded-2xl flex items-center justify-center gap-1 max-w-xs mx-auto">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-[#202331] text-[#F5F6FA] shadow-sm'
                : 'text-[#A4A7B2] hover:text-[#F5F6FA]'
            }`}
          >
            Monthly ($9.99)
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              billingCycle === 'yearly'
                ? 'bg-[#C6FF4D] text-[#101116] shadow-sm'
                : 'text-[#A4A7B2] hover:text-[#F5F6FA]'
            }`}
          >
            <span>Annual ($79.99)</span>
            <span className="text-[9px] px-1 rounded bg-[#101116] text-[#C6FF4D]">Save 33%</span>
          </button>
        </div>

        {/* Feature Matrix */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {features.map((feat, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-[#13141D] border border-[#232635] flex items-center justify-between text-xs"
            >
              <span className="text-[#F5F6FA] font-medium">{feat.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-[#6B7082] text-[10px] w-8 text-center">
                  {feat.free ? <Check className="w-3.5 h-3.5 mx-auto text-[#A4A7B2]" /> : '—'}
                </span>
                <span className="text-[#C6FF4D] text-[10px] w-8 text-center font-bold">
                  <Check className="w-4 h-4 mx-auto text-[#C6FF4D]" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sandbox Upgrade Notice & Action */}
        <div className="mt-5 pt-4 border-t border-[#252837] space-y-3">
          <div className="p-3 rounded-2xl bg-[#1F2231] border border-[#2B3044] text-xs text-[#A4A7B2] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#C6FF4D] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong className="text-[#F5F6FA]">Sandbox Simulator:</strong> This is a premium sandbox. You can activate or deactivate Pro VIP instantly to preview all premium features without real financial charges.
            </p>
          </div>

          <button
            onClick={() => {
              onTogglePremium(!userProfile.isPremium);
              onClose();
            }}
            className={`w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg ${
              userProfile.isPremium
                ? 'bg-[#25293A] text-[#FF6B6B] border border-[#FF4D4D]/30 hover:bg-[#321C22]'
                : 'bg-[#C6FF4D] text-[#101116] hover:bg-[#d5ff73] shadow-[#C6FF4D]/20'
            }`}
          >
            {userProfile.isPremium ? 'Cancel Pro VIP Simulation' : 'Activate Pro VIP Simulation'}
          </button>
        </div>
      </div>
    </div>
  );
};
