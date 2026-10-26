import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Google GenAI client
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health / Config check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'DENT ZYM APP Backend',
      aiConfigured: Boolean(ai),
      timestamp: new Date().toISOString(),
    });
  });

  // AI Fitness Coach endpoint
  app.post('/api/ai-coach', async (req: Request, res: Response): Promise<void> => {
    const { messages, userProfile } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    const latestMessage = messages[messages.length - 1];
    const userPrompt = latestMessage.content || latestMessage.text || '';

    // If Gemini is not configured, return an explicit demo response
    if (!ai) {
      const demoReply = generateDemoCoachResponse(userPrompt, userProfile);
      res.json({
        reply: demoReply,
        isDemo: true,
        notice: 'AI API key not detected in server environment. Responding with built-in DENT ZYM Intelligence Engine.',
      });
      return;
    }

    try {
      const systemInstruction = `You are the DENT ZYM APP Coach, an elite personal trainer, biomechanics specialist, and sports nutritionist.
Brand Motto: "Train Hard. Stay Strong. Transform Yourself."
Category: Premium Gym, Fitness & AI Personal Trainer.

User Profile Context:
- Name: ${userProfile?.name || 'Athlete'}
- Goal: ${userProfile?.goal || 'General Fitness & Performance'}
- Fitness Level: ${userProfile?.experience || 'Intermediate'}
- Workout Location: ${userProfile?.location || 'Gym'}
- Dietary Preference: ${userProfile?.diet || 'Balanced / Flexible'}
- Target Muscle / Focus: ${userProfile?.focus || 'Full Body Strength & Conditioning'}
- Current Weight: ${userProfile?.weight ? `${userProfile.weight} kg` : 'Not specified'}
- Height: ${userProfile?.height ? `${userProfile.height} cm` : 'Not specified'}

Guidelines & Tone:
1. Provide motivational, scientifically accurate, and high-impact workout, recovery, and nutrition guidance.
2. If the user asks about nutrition or Indian food (e.g. roti, dal, paneer, curd, eggs, rice, chicken), offer macro-aware, practical portioning and recipes.
3. Keep formatting clean with clear steps, bold highlights, and bullet points.
4. STRICT SAFETY: You must NEVER diagnose medical conditions or injuries, never prescribe drugs or steroids, and never recommend extreme calorie deficits (<1200 kcal/day). If an injury or severe pain is mentioned, advise consulting a licensed physician or physical therapist.
5. Answer directly without robotic intro disclaimers. Give actionable, expert fitness advice.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nUser Question: ${userPrompt}` }],
          },
        ],
      });

      const replyText = response.text || "I'm ready to help you optimize your training and nutrition. What's our next goal?";
      res.json({
        reply: replyText,
        isDemo: false,
      });
    } catch (err: unknown) {
      console.error('Gemini API Error:', err);
      const fallbackReply = generateDemoCoachResponse(userPrompt, userProfile);
      res.json({
        reply: fallbackReply,
        isDemo: true,
        notice: 'Live AI request timed out. Showing DENT ZYM APP local training protocol.',
      });
    }
  });

  // Local demo fallback response generator
  function generateDemoCoachResponse(prompt: string, profile: any): string {
    const p = prompt.toLowerCase();
    const name = profile?.name || 'Athlete';
    const goal = profile?.goal || 'Muscle Gain';
    const diet = profile?.diet || 'Balanced';

    if (p.includes('muscle') || p.includes('build') || p.includes('hypertrophy')) {
      return `### DENT ZYM Hypertrophy Protocol for ${name}

Target Goal: **${goal}**
Motto: *Train Hard. Stay Strong. Transform Yourself.*

**1. Progressive Overload Rules:**
- Focus on compound lifts: Barbell Squats, Romanian Deadlifts, Overhead Press, and Pull-ups.
- Keep working sets within **6–12 reps** stopping 1–2 reps before mechanical failure (RPE 8–9).
- Increase weight by 2.5% to 5% once you can complete top reps across all sets with pristine technique.

**2. Nutrition Anchor:**
- Target **1.6–2.2g of protein per kg of bodyweight** daily.
- For dietary preference (**${diet}**): Prioritize quality sources like whey/plant protein, paneer, eggs, chicken breast, Greek yogurt/hung curd, and sprouted lentils.
- Maintain a gentle caloric surplus of +250–350 kcal above maintenance to fuel muscle protein synthesis without excessive fat gain.

**3. Recovery Protocol:**
- Allow 48–72 hours before hitting the same prime mover muscle group again.
- Aim for 7.5–8.5 hours of restorative sleep for peak growth hormone release.`;
    }

    if (p.includes('protein') || p.includes('diet') || p.includes('food') || p.includes('indian') || p.includes('eat')) {
      return `### DENT ZYM Nutrition & Protein Breakdown for ${name}

Daily Goal Strategy: **${diet} Nutrition Architecture**

**1. Recommended Daily Intake:**
- **Protein**: ~130g – 160g depending on target lean mass.
- **Carbohydrates**: 200g – 250g (complex carbs for sustained glycogen replenishment).
- **Healthy Fats**: 50g – 65g (essential for hormone balance).

**2. High-Yield Food Options:**
- **Paneer / Cottage Cheese** (100g): ~18g Protein, 20g Fat (opt for low-fat paneer if cutting).
- **Cooked Yellow/Black Dal** (1 bowl ~200g): ~12g Protein, 30g complex carbs.
- **Eggs** (2 whole + 2 whites): ~20g bioavailable Protein.
- **Curd / Dahi** (200g): ~8g Protein with gut-friendly probiotics.
- **Roti** (1 medium whole-wheat ~35g): ~3g Protein, 18g carbs, 70 kcal.
- **Chicken Breast** (150g grilled): ~42g pure Protein, low fat.
- **Rolled Oats** (50g): ~7g Protein, 34g slow-burning carbs, high beta-glucan fiber.

**Hydration Benchmark**: Drink 3.0 to 3.5 Liters of water daily to maintain intracellular muscle volume and electrolyte efficiency.`;
    }

    if (p.includes('fat') || p.includes('loss') || p.includes('cut') || p.includes('weight')) {
      return `### DENT ZYM Lean Shred & Fat Loss Protocol for ${name}

**Core Strategy: Sustainable Deficit with High Satiety**

1. **Target Caloric Deficit**: 300–450 kcal below maintenance. Avoid drastic cuts that compromise hormonal health and muscle retention.
2. **Protein Protection**: Keep protein elevated at **2.0g per kg** to preserve lean muscle tissue while losing adipose tissue.
3. **NEAT & Cardio Strategy**:
   - Target 8,000 – 10,000 steps daily (Non-Exercise Activity Thermogenesis burns more fat over 24h than HIIT alone).
   - Add 2 sessions of 20-minute Low-Intensity Steady State (LISS) cardio post-workout.
4. **Hydration Cue**: Consume 500ml of cold water 20 minutes before main meals to naturally optimize portion control.`;
    }

    if (p.includes('beginner') || p.includes('routine') || p.includes('plan')) {
      return `### DENT ZYM 3-Day Foundation Routine

Designed for **${profile?.location || 'Gym'}** Training:

- **Day 1: Upper Body Power** (Bench Press, Lat Pulldowns, DB Shoulder Press, Cable Rows, Tricep Pushdowns)
- **Day 2: Lower Body & Core** (Goblet Squats, Romanian Deadlifts, Walking Lunges, Standing Calf Raises, Plank Holds)
- **Day 3: Active Rest & Recovery Mobility** (30-min brisk walk, thoracic spine drills, deep hip flexor stretches)
- **Day 4: Full Body Conditioning** (Trap Bar Deadlift, Push-ups, Incline DB Press, Dumbbell Step-ups, Face Pulls)

*Track each set in your DENT ZYM Workout Tracker. Quality repetitions always beat reckless weight.*`;
    }

    return `### DENT ZYM Coaching Insight for ${name}

Here is your customized strategy based on your profile (**${goal}** | **${profile?.experience || 'Intermediate'}**):

1. **Training Consistency**: Prioritize 3 to 4 focused 45-minute sessions per week rather than sporadic 2-hour marathon workouts.
2. **Form Over Load**: Master eccentric control (3 seconds lowering the weight) to dramatically heighten time-under-tension and prevent tendon strain.
3. **Daily Nutrition Tracking**: Log meals in the DENT ZYM Nutrition Planner to eliminate guesswork in your daily protein and caloric targets.
4. **Rest & Recovery**: Muscle growth occurs during sleep, not in the gym. Prioritize consistent sleep wake cycles.

Feel free to ask for specific exercise form tips, custom meal recipes, or a tailored workout breakdown!`;
  }

  // Set up Vite dev server or static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`⚡ DENT ZYM APP full-stack server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start DENT ZYM server:', err);
});
