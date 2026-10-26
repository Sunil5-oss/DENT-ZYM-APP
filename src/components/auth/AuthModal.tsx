import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { StorageService } from '../../services/storageService';
import { DentZymLogo } from '../common/DentZymLogo';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (profile: UserProfile, isNewUser?: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (mode === 'forgot') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setForgotSuccess(true);
      }, 800);
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const existing = StorageService.getUserProfile();

      if (mode === 'signup') {
        const newProfile: UserProfile = {
          ...existing,
          id: `usr-${Date.now()}`,
          name: name.trim(),
          email: email.trim(),
          onboardingCompleted: false, // will trigger onboarding
          createdAt: new Date().toISOString(),
        };
        StorageService.saveUserProfile(newProfile);
        onAuthSuccess(newProfile, true);
      } else {
        // Login mode
        const updatedProfile: UserProfile = {
          ...existing,
          email: email.trim(),
          name: existing.name || email.split('@')[0],
        };
        StorageService.saveUserProfile(updatedProfile);
        onAuthSuccess(updatedProfile, false);
      }
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#181A24] border border-[#2B2F40] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#C6FF4D]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#9B7BFF]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <DentZymLogo size="lg" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-[#F5F6FA]">
            {mode === 'login' && 'Welcome to DENT ZYM APP'}
            {mode === 'signup' && 'Create Your Athlete Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-[#A4A7B2] mt-1">
            {mode === 'login' && 'Sign in to access your workouts, nutrition, and AI Coach.'}
            {mode === 'signup' && 'Train Hard · Stay Strong · Transform Yourself'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-[#FF4D4D]/15 border border-[#FF4D4D]/30 text-xs text-[#FF6B6B] flex items-center gap-2">
            <span>•</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Forgot Password Success Notice */}
        {forgotSuccess ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#C6FF4D]/20 border border-[#C6FF4D]/40 flex items-center justify-center mx-auto text-[#C6FF4D]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#F5F6FA]">Reset Link Dispatched</h3>
            <p className="text-xs text-[#A4A7B2] max-w-xs mx-auto">
              We have sent password reset instructions to <span className="text-[#C6FF4D]">{email}</span>.
            </p>
            <button
              onClick={() => {
                setForgotSuccess(false);
                setMode('login');
              }}
              className="mt-2 text-xs font-semibold text-[#C6FF4D] hover:underline cursor-pointer"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-[#A4A7B2] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7082]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Miller"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#12131A] border border-[#292D3D] text-sm text-[#F5F6FA] placeholder-[#555A6E] focus:outline-none focus:border-[#C6FF4D] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#A4A7B2] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7082]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@dentzym.app"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#12131A] border border-[#292D3D] text-sm text-[#F5F6FA] placeholder-[#555A6E] focus:outline-none focus:border-[#C6FF4D] transition-colors"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#A4A7B2]">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setMode('forgot');
                      }}
                      className="text-[11px] text-[#C6FF4D] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7082]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#12131A] border border-[#292D3D] text-sm text-[#F5F6FA] placeholder-[#555A6E] focus:outline-none focus:border-[#C6FF4D] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7082] hover:text-[#A4A7B2] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-[#C6FF4D] text-[#101116] font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-[#d4ff6e] active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-[#C6FF4D]/10 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#101116] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'Sign In to DENT ZYM'}
                    {mode === 'signup' && 'Create Account & Begin'}
                    {mode === 'forgot' && 'Send Reset Link'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Mode Switcher */}
        <div className="mt-6 pt-4 border-t border-[#252837] text-center text-xs text-[#A4A7B2]">
          {mode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setMode('signup');
                }}
                className="text-[#C6FF4D] font-bold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already registered with DENT ZYM?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setMode('login');
                }}
                className="text-[#C6FF4D] font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7082] hover:text-[#F5F6FA] text-lg font-bold p-1 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
