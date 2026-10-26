import React, { useState, useEffect, useRef } from 'react';
import { Exercise, ActiveWorkoutSession, CompletedWorkout } from '../../types';
import { ExerciseGraphic } from '../common/ExerciseGraphic';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  Plus,
  Minus,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface WorkoutPlayerProps {
  session: ActiveWorkoutSession;
  onUpdateSession: (session: ActiveWorkoutSession) => void;
  onFinishWorkout: (completed: CompletedWorkout) => void;
  onExitPlayer: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  session,
  onUpdateSession,
  onFinishWorkout,
  onExitPlayer,
}) => {
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number>(0);
  const [isRestActive, setIsRestActive] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [completedSummary, setCompletedSummary] = useState<CompletedWorkout | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Play a crisp pleasant chime when rest timer completes
  const playChime = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // AudioContext policy fallback
    }
  };

  // Workout Session Timer (ticks every second if not paused)
  useEffect(() => {
    if (!session.isActive || session.isPaused) return;

    const interval = setInterval(() => {
      onUpdateSession({
        ...session,
        elapsedSeconds: session.elapsedSeconds + 1,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [session, onUpdateSession]);

  // Rest Countdown Timer
  useEffect(() => {
    if (!isRestActive || restSecondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setRestSecondsRemaining((prev) => {
        if (prev <= 1) {
          playChime();
          setIsRestActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRestActive, restSecondsRemaining]);

  const currentExerciseData = session.exercises[session.currentExerciseIndex];
  const currentExercise = currentExerciseData?.exercise;
  const currentSets = currentExerciseData?.sets || [];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Toggle set completion
  const handleToggleSet = (index: number) => {
    const updatedSets = [...currentSets];
    const wasCompleted = updatedSets[index].completed;
    updatedSets[index] = {
      ...updatedSets[index],
      completed: !wasCompleted,
    };

    const updatedExercises = [...session.exercises];
    updatedExercises[session.currentExerciseIndex] = {
      ...currentExerciseData,
      sets: updatedSets,
    };

    onUpdateSession({
      ...session,
      exercises: updatedExercises,
    });

    // If set was just marked as completed, trigger rest timer
    if (!wasCompleted) {
      setRestSecondsRemaining(currentExercise.restDurationSeconds || 60);
      setIsRestActive(true);
    }
  };

  const handleUpdateWeight = (setIndex: number, delta: number) => {
    const updatedSets = [...currentSets];
    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      weight: Math.max(0, updatedSets[setIndex].weight + delta),
    };
    const updatedExercises = [...session.exercises];
    updatedExercises[session.currentExerciseIndex] = {
      ...currentExerciseData,
      sets: updatedSets,
    };
    onUpdateSession({ ...session, exercises: updatedExercises });
  };

  const handleUpdateReps = (setIndex: number, delta: number) => {
    const updatedSets = [...currentSets];
    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      reps: Math.max(1, updatedSets[setIndex].reps + delta),
    };
    const updatedExercises = [...session.exercises];
    updatedExercises[session.currentExerciseIndex] = {
      ...currentExerciseData,
      sets: updatedSets,
    };
    onUpdateSession({ ...session, exercises: updatedExercises });
  };

  const handleNextExercise = () => {
    if (session.currentExerciseIndex < session.exercises.length - 1) {
      setIsRestActive(false);
      onUpdateSession({
        ...session,
        currentExerciseIndex: session.currentExerciseIndex + 1,
      });
    }
  };

  const handlePrevExercise = () => {
    if (session.currentExerciseIndex > 0) {
      setIsRestActive(false);
      onUpdateSession({
        ...session,
        currentExerciseIndex: session.currentExerciseIndex - 1,
      });
    }
  };

  const handleTogglePause = () => {
    onUpdateSession({
      ...session,
      isPaused: !session.isPaused,
    });
  };

  const handleCompleteWorkout = () => {
    // Calculate total stats
    let totalCompletedSets = 0;
    let totalVolumeKg = 0;
    let completedExercisesCount = 0;

    session.exercises.forEach((item) => {
      let anyCompleted = false;
      item.sets.forEach((set) => {
        if (set.completed) {
          totalCompletedSets += 1;
          totalVolumeKg += set.weight * set.reps;
          anyCompleted = true;
        }
      });
      if (anyCompleted) completedExercisesCount += 1;
    });

    const durationMinutes = Math.max(1, Math.round(session.elapsedSeconds / 60));
    const calories = Math.round(durationMinutes * 7.5 + totalCompletedSets * 8);

    const completedRecord: CompletedWorkout = {
      id: `cw-${Date.now()}`,
      title: session.workoutTitle,
      category: session.category,
      durationMinutes,
      exercisesCompleted: completedExercisesCount || session.exercises.length,
      totalSets: totalCompletedSets || session.exercises.length * 3,
      totalVolumeKg,
      caloriesBurned: calories,
      date: new Date().toISOString(),
    };

    setCompletedSummary(completedRecord);
    setShowSummaryModal(true);

    // Blast celebratory confetti!
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C6FF4D', '#9B7BFF', '#F5F6FA'],
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-12 animate-fadeIn">
      {/* Top Session Status Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#171923] border border-[#262A39]">
        <button
          onClick={onExitPlayer}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#A4A7B2] hover:text-[#F5F6FA] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Exit to Routines</span>
        </button>

        {/* Live workout timer */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C6FF4D]" />
          <span className="font-tabular text-lg font-bold text-[#F5F6FA]">
            {formatTime(session.elapsedSeconds)}
          </span>
          <button
            onClick={handleTogglePause}
            className={`p-1.5 rounded-lg border cursor-pointer ${
              session.isPaused
                ? 'bg-[#C6FF4D] text-[#101116] border-[#C6FF4D]'
                : 'bg-[#1F222F] text-[#A4A7B2] border-[#2E3243] hover:text-[#F5F6FA]'
            }`}
          >
            {session.isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Finish CTA */}
        <button
          onClick={handleCompleteWorkout}
          className="px-4 py-1.5 rounded-xl bg-[#C6FF4D] text-[#101116] text-xs font-bold hover:bg-[#d2ff6e] transition-all cursor-pointer shadow-md shadow-[#C6FF4D]/15"
        >
          Finish Workout
        </button>
      </div>

      {/* Rest Timer Drawer (shown when rest timer is active) */}
      {isRestActive && restSecondsRemaining > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#9B7BFF]/20 via-[#1C1E2A] to-[#C6FF4D]/15 border border-[#9B7BFF]/40 flex items-center justify-between gap-4 animate-slideDown">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9B7BFF]/20 border border-[#9B7BFF] flex items-center justify-center font-tabular font-extrabold text-[#9B7BFF] text-sm">
              {restSecondsRemaining}s
            </div>
            <div>
              <div className="text-xs font-bold text-[#F5F6FA] uppercase tracking-wider">
                Rest Period Active
              </div>
              <div className="text-[11px] text-[#A4A7B2]">
                Regulate breathing and prepare for the next set
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRestSecondsRemaining((prev) => prev + 15)}
              className="px-2.5 py-1 rounded-lg bg-[#242736] text-[11px] font-bold text-[#F5F6FA] hover:bg-[#2F3448] cursor-pointer"
            >
              +15s
            </button>
            <button
              onClick={() => setIsRestActive(false)}
              className="px-3 py-1 rounded-lg bg-[#9B7BFF] text-[11px] font-bold text-[#101116] hover:bg-[#b096ff] cursor-pointer"
            >
              Skip Rest
            </button>
          </div>
        </div>
      )}

      {/* Current Exercise Spotlight Card */}
      {currentExercise && (
        <div className="p-6 rounded-3xl bg-[#171923] border border-[#272B3B] space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C6FF4D] mb-1">
                Exercise {session.currentExerciseIndex + 1} of {session.exercises.length} · {currentExercise.category}
              </div>
              <h2 className="text-2xl font-black text-[#F5F6FA]">{currentExercise.name}</h2>
              <div className="flex items-center gap-2 text-xs text-[#A4A7B2] mt-1">
                <span>Target: {currentExercise.targetMuscle}</span>
                <span>·</span>
                <span>Equipment: {currentExercise.equipment}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevExercise}
                disabled={session.currentExerciseIndex === 0}
                className="p-2 rounded-xl bg-[#202330] border border-[#2B2F40] text-[#A4A7B2] hover:text-[#F5F6FA] disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextExercise}
                disabled={session.currentExerciseIndex === session.exercises.length - 1}
                className="p-2 rounded-xl bg-[#202330] border border-[#2B2F40] text-[#A4A7B2] hover:text-[#F5F6FA] disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Exercise Posture Diagram */}
          <div className="h-44 w-full bg-[#111219] rounded-2xl border border-[#222533] p-4 flex items-center justify-center relative overflow-hidden">
            <ExerciseGraphic type={currentExercise.svgType} className="max-h-full max-w-sm" />
            <span className="absolute bottom-2 right-3 text-[10px] uppercase font-bold tracking-widest text-[#6B7082]">
              DENT ZYM Form Guide
            </span>
          </div>

          {/* Sets Tracking Table */}
          <div className="space-y-2">
            <div className="grid grid-cols-12 text-[11px] font-bold text-[#A4A7B2] uppercase tracking-wider px-3 pb-1">
              <div className="col-span-2">Set</div>
              <div className="col-span-5 text-center">Weight (kg)</div>
              <div className="col-span-3 text-center">Reps</div>
              <div className="col-span-2 text-right">Done</div>
            </div>

            {currentSets.map((set, idx) => (
              <div
                key={set.setNumber}
                className={`grid grid-cols-12 items-center p-3 rounded-2xl border transition-all ${
                  set.completed
                    ? 'bg-[#18231C] border-[#C6FF4D]/30'
                    : 'bg-[#1B1E29] border-[#292D3D]'
                }`}
              >
                {/* Set Number */}
                <div className="col-span-2 font-tabular font-bold text-sm text-[#F5F6FA]">
                  #{set.setNumber}
                </div>

                {/* Weight Control */}
                <div className="col-span-5 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleUpdateWeight(idx, -2.5)}
                    className="w-7 h-7 rounded-lg bg-[#252837] text-xs font-bold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-tabular font-extrabold text-sm text-[#F5F6FA] min-w-[48px] text-center">
                    {set.weight}
                  </span>
                  <button
                    onClick={() => handleUpdateWeight(idx, 2.5)}
                    className="w-7 h-7 rounded-lg bg-[#252837] text-xs font-bold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Reps Control */}
                <div className="col-span-3 flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => handleUpdateReps(idx, -1)}
                    className="w-6 h-6 rounded-md bg-[#252837] text-[10px] font-bold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-tabular font-bold text-sm text-[#F5F6FA] min-w-[24px] text-center">
                    {set.reps}
                  </span>
                  <button
                    onClick={() => handleUpdateReps(idx, 1)}
                    className="w-6 h-6 rounded-md bg-[#252837] text-[10px] font-bold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Checkbox */}
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => handleToggleSet(idx)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      set.completed
                        ? 'bg-[#C6FF4D] text-[#101116] border-[#C6FF4D] shadow-sm'
                        : 'bg-[#222533] border-[#313649] text-transparent hover:border-[#C6FF4D]/60'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form instructions accordion */}
          <div className="p-4 rounded-2xl bg-[#12131A] border border-[#232635] space-y-2">
            <h4 className="text-xs font-bold text-[#F5F6FA] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C6FF4D]" />
              Form Execution & Safety Cues
            </h4>
            <ul className="text-xs text-[#A4A7B2] space-y-1 list-disc list-inside">
              {currentExercise.instructions.slice(0, 3).map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* WORKOUT COMPLETION SUMMARY MODAL */}
      {showSummaryModal && completedSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#181A25] border border-[#2C3144] rounded-3xl p-6 md:p-8 shadow-2xl text-center space-y-6 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9B7BFF] to-[#C6FF4D] p-1 mx-auto shadow-lg shadow-[#C6FF4D]/20">
              <div className="w-full h-full bg-[#101116] rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-[#C6FF4D]" />
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#C6FF4D] mb-1">
                Workout Crushed!
              </div>
              <h3 className="text-2xl font-black text-[#F5F6FA]">{completedSummary.title}</h3>
              <p className="text-xs text-[#A4A7B2] mt-1">
                Your effort and tonnage have been logged to your DENT ZYM athlete record.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#12131B] border border-[#252837] text-left">
                <div className="text-[11px] text-[#A4A7B2] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C6FF4D]" />
                  <span>Duration</span>
                </div>
                <div className="font-tabular font-black text-xl text-[#F5F6FA] mt-1">
                  {completedSummary.durationMinutes} min
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#12131B] border border-[#252837] text-left">
                <div className="text-[11px] text-[#A4A7B2] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#FF7043]" />
                  <span>Calories Burned</span>
                </div>
                <div className="font-tabular font-black text-xl text-[#F5F6FA] mt-1">
                  ~{completedSummary.caloriesBurned} kcal
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#12131B] border border-[#252837] text-left">
                <div className="text-[11px] text-[#A4A7B2] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#9B7BFF]" />
                  <span>Sets Completed</span>
                </div>
                <div className="font-tabular font-black text-xl text-[#F5F6FA] mt-1">
                  {completedSummary.totalSets} Sets
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#12131B] border border-[#252837] text-left">
                <div className="text-[11px] text-[#A4A7B2] flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#C6FF4D]" />
                  <span>Total Volume</span>
                </div>
                <div className="font-tabular font-black text-xl text-[#F5F6FA] mt-1">
                  {completedSummary.totalVolumeKg.toLocaleString()} kg
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSummaryModal(false);
                onFinishWorkout(completedSummary);
              }}
              className="w-full py-3 rounded-xl bg-[#C6FF4D] text-[#101116] font-bold text-sm hover:bg-[#d6ff73] transition-all cursor-pointer shadow-lg shadow-[#C6FF4D]/15"
            >
              Save & Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
