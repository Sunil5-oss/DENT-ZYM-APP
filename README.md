# DENT ZYM APP — Premium Gym, Fitness & AI Personal Trainer
> **Tagline:** Train Hard. Stay Strong. Transform Yourself.

**DENT ZYM APP** is a full-stack, futuristic gym, fitness tracking, and sports nutrition platform powered by the Google Gemini API. It combines real-time set tracking with interactive rest countdown timers, sound alerts, an authentic Indian nutrition database (roti, dal, paneer, curd, soya, chana, etc.), personalized hypertrophy blueprints, progress analytics, and a multi-step onboarding system.

The application is engineered to operate seamlessly on:
1. **Android Phones & Tablets** (native Flutter code in `/flutter` + responsive web touch app).
2. **Responsive Web Browsers** (Chrome, Firefox, Safari, Edge with phone preview simulator).
3. **Desktop Workstations** (full widescreen layout with Navigation Rail).

---

## 1. Visual & Architectural Identity

- **Distinctive Color Palette:**
  - **Midnight Graphite** (`#101116`) — Dominant canvas background
  - **Deep Charcoal** (`#191B23`) & **Surface Charcoal** (`#20232E`) — Structural card layers
  - **Electric Lime** (`#C6FF4D`) — Primary action & completion accent
  - **Electric Violet** (`#9B7BFF`) — AI Intelligence & benchmark accent
  - **Soft White** (`#F5F6FA`) & **Muted Gray** (`#A4A7B2`) — Typography hierarchy
- **Custom Fitness Logo & Monogram:**
  - Features the official **DENT ZYM APP** athletic emblem fusing a high-tension dumbbell barbell with an angled D-Z core energy bar in Electric Lime and Violet.
- **Ergonomics & Layout Integrity:**
  - **Desktop / Tablet:** Sleek Navigation Rail, multi-column dashboard, and interactive **Phone Preview** toggle to simulate the mobile phone app on wide screens.
  - **Mobile Touch Devices:** Fixed bottom tab bar ($\ge 44\text{px}$ touch hitboxes) and sticky thumb controls.

---

## 2. Core Functional Modules

### 🏋️ 1. Workout Management System & Live Player
- **9 Muscle Categories:** Chest, Back, Shoulders, Biceps, Triceps, Legs, Abs, Full Body, and Cardio.
- **3 Training Levels:** Beginner, Intermediate, and Advanced.
- **Live Workout Player:**
  - Real-time elapsed session timer persisted across tab navigation and reloads.
  - Set-by-set weight (kg) and rep counter adjustments.
  - Interactive rest countdown timer with auto-advance and Web Audio chime sound.
  - Dynamic vector posture diagrams and form safety rules.
  - Confetti celebration modal upon workout completion with total tonnage volume (kg) calculation.
  - Comprehensive history log of past workouts.

### 🥗 2. Smart Nutrition & Indian Diet Planner
- **Macronutrient Tracking:** Real-time visual progress bars for Calories, Protein, Carbohydrates, and Fats.
- **Indian & Global Food Database:**
  - Whole Wheat Roti, Basmati Rice, Yellow Moong Dal, Dal Makhani, Fresh Paneer, Low-Fat Paneer, Curd / Dahi, Boiled Eggs, Grilled Chicken Breast, Rolled Oats, Soya Chunks, Roasted Chana, Banana, etc.
- **Serving Multipliers:** 0.5x, 1x, 1.5x, 2x with automatic nutritional recalculation.
- **Hydration Tracker:** Interactive `+250ml` / `-250ml` logging against a 3,000ml benchmark.
- **Goal-Calibrated Diet Templates:**
  - Indian Vegetarian Hypertrophy Diet
  - Lean Shred & Caloric Deficit Plan
  - High-Performance Power & Strength
  - Longevity & Clean Maintenance

### 🤖 3. Dedicated AI Fitness Coach
- Live chat backed by server-side `gemini-3.8-flash`.
- Calibrated to the user's specific goals, age, height, current weight, dietary preferences, and gym equipment.
- Pre-populated quick chips for common athlete queries (protein targets, Indian meal recipes, squat form cues, beginner routines).
- Chat history persistence with one-click reset.
- Resilient built-in offline engine if offline or API key is absent.

### 📈 4. Progress Analytics & Personal Records (PRs)
- **SVG Weight Trend Curve:** Visual weight trajectory tracking over time.
- **Personal Records (PRs) Board:** Bench Press, Back Squat, Deadlift, Overhead Press, and custom lifts.
- **Telemetry Export:** Instant one-click download of athlete data as structured JSON.

### 👤 5. Profile Calibration & Onboarding
- 4-step onboarding questionnaire calibrating BMI, fitness objectives, experience levels, and diet style.
- Account management, notification reminder toggles, privacy disclaimers, and data reset flow.
- Pro VIP sandbox subscription toggle with feature comparison matrix.

---

## 3. Technology Stack

- **Web Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Backend Proxy:** Node.js Express server (`server.ts`) with Vite dev middleware.
- **AI Engine:** Google GenAI SDK (`@google/genai` v2.4.0) with model `gemini-3.8-flash`.
- **Flutter Codebase:** Modular Dart code located in `/flutter/lib` with provider state management and `fl_chart`.
- **Android Support:** AndroidManifest configured in `/flutter/android/app/src/main/AndroidManifest.xml` with `android:label="DENT ZYM APP"`.

---

## 4. Instructions for Running

### Running the Web Application (AI Studio / Local)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server (runs full-stack Express server on port 3000):
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in any web or mobile browser.
4. Toggle between **Desktop View** and **Phone Preview** in the top navigation bar.

### Running the Android Application (via Flutter)
1. Navigate to the flutter folder:
   ```bash
   cd flutter
   flutter pub get
   ```
2. Connect your Android device via USB or start an Android Emulator.
3. Run the app:
   ```bash
   flutter run -d android
   ```
4. To build an APK for distribution:
   ```bash
   flutter build apk --release
   ```
   The APK will be generated at `flutter/build/app/outputs/flutter-apk/app-release.apk` with the application label **DENT ZYM APP**.

---

## 5. Verification & Lint

To verify the codebase:
```bash
npm run lint
npm run build
```
Both compile cleanly with 0 warnings or type errors.
