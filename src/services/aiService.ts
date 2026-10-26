import { ChatMessage, UserProfile } from '../types';

export interface AICoachResponse {
  reply: string;
  isDemo: boolean;
  notice?: string;
}

export const AIService = {
  async askCoach(
    messages: { role: string; content: string }[],
    userProfile: UserProfile
  ): Promise<AICoachResponse> {
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          userProfile: {
            name: userProfile.name,
            goal: userProfile.goal,
            experience: userProfile.experience,
            location: userProfile.location,
            diet: userProfile.diet,
            weight: userProfile.weight,
            height: userProfile.height,
            workoutDaysPerWeek: userProfile.workoutDaysPerWeek,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Coach server responded with status: ${response.status}`);
      }

      const data = await response.json();
      return {
        reply: data.reply || 'No response generated.',
        isDemo: Boolean(data.isDemo),
        notice: data.notice,
      };
    } catch (err) {
      console.warn('AI Coach server unreachable, using offline fallback:', err);
      return {
        reply: `### Offline DENT ZYM Intelligence
        
I am currently operating in resilient offline mode.

**Key Rule for ${userProfile.goal}:**
- Prioritize consistency: Train 3–5 days per week.
- Keep protein at roughly 1.6–2.0g per kg of bodyweight (${Math.round(userProfile.weight * 1.8)}g/day).
- Ensure 7+ hours of quality sleep for muscular recovery.

Feel free to try asking again when network connection is restored!`,
        isDemo: true,
        notice: 'Offline local engine response.',
      };
    }
  },

  async checkHealth(): Promise<{ aiConfigured: boolean }> {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        return { aiConfigured: Boolean(data.aiConfigured) };
      }
    } catch (e) {
      // ignore
    }
    return { aiConfigured: false };
  },
};
