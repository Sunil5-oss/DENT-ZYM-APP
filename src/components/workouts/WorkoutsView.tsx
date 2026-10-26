import React, { useState } from 'react';
import {
  Exercise,
  MuscleGroup,
  FitnessExperience,
  ActiveWorkoutSession,
  CompletedWorkout,
} from '../../types';
import { EXERCISES_DATABASE } from '../../data/exercisesData';
import { ExerciseGraphic } from '../common/ExerciseGraphic';
import {
  Dumbbell,
  Play,
  Search,
  Filter,
  Flame,
  Clock,
  ChevronRight,
  Info,
  Calendar,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface WorkoutsViewProps {
  onStartSession: (session: ActiveWorkoutSession) => void;
  completedWorkouts: CompletedWorkout[];
}

export const WorkoutsView: React.FC<WorkoutsViewProps> = ({
  onStartSession,
  completedWorkouts,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MuscleGroup | 'All'>('All');
  const [selectedLevel, setSelectedLevel] = useState<FitnessExperience | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExerciseDetail, setSelectedExerciseDetail] = useState<Exercise | null>(null);
  const [activeTab, setActiveTab] = useState<'routines' | 'exercises' | 'history'>('routines');

  const categories: (MuscleGroup | 'All')[] = [
    'All',
    'Chest',
    'Back',
    'Shoulders',
    'Legs',
    'Biceps',
    'Triceps',
    'Abs',
    'Full Body',
    'Cardio',
  ];

  const levels: (FitnessExperience | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered exercises
  const filteredExercises = EXERCISES_DATABASE.filter((ex) => {
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || ex.level === selectedLevel;
    const matchesSearch =
      searchQuery === '' ||
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  // Pre-configured Routines
  const curatedRoutines = [
    {
      id: 'routine-chest-triceps',
      title: 'Chest & Tricep Hypertrophy',
      category: 'Chest' as MuscleGroup,
      duration: '45 min',
      difficulty: 'Intermediate' as FitnessExperience,
      exerciseIds: ['ex-chest-1', 'ex-chest-2', 'ex-triceps-1', 'ex-chest-3'],
      description: 'Progressive chest pressing with direct lateral tricep isolation.',
    },
    {
      id: 'routine-back-biceps',
      title: 'Back Depth & Bicep Pull',
      category: 'Back' as MuscleGroup,
      duration: '50 min',
      difficulty: 'Intermediate' as FitnessExperience,
      exerciseIds: ['ex-back-1', 'ex-back-2', 'ex-back-3', 'ex-biceps-1'],
      description: 'Heavy hinge pulling, vertical lat pulldowns, and strict curls.',
    },
    {
      id: 'routine-legs-core',
      title: 'Lower Body & Core Annihilation',
      category: 'Legs' as MuscleGroup,
      duration: '55 min',
      difficulty: 'Advanced' as FitnessExperience,
      exerciseIds: ['ex-legs-1', 'ex-legs-2', 'ex-legs-3', 'ex-abs-1'],
      description: 'Full depth barbell squats, hamstrings hip hinge, and hanging core tucks.',
    },
    {
      id: 'routine-shoulders-abs',
      title: 'Overhead Press & Core Steel',
      category: 'Shoulders' as MuscleGroup,
      duration: '40 min',
      difficulty: 'Beginner' as FitnessExperience,
      exerciseIds: ['ex-shoulders-1', 'ex-shoulders-2', 'ex-abs-2'],
      description: 'Overhead military press, side delts sculpting, and isometric plank hold.',
    },
  ];

  const startRoutine = (routineTitle: string, category: MuscleGroup, exerciseIds: string[]) => {
    const exercisesToInclude = EXERCISES_DATABASE.filter((e) => exerciseIds.includes(e.id));
    const activeExercises = exercisesToInclude.map((ex) => ({
      exercise: ex,
      sets: Array.from({ length: ex.defaultSets }, (_, i) => ({
        setNumber: i + 1,
        reps: 10,
        weight: ex.category === 'Legs' ? 60 : ex.category === 'Chest' ? 40 : 25,
        completed: false,
      })),
    }));

    const session: ActiveWorkoutSession = {
      id: `session-${Date.now()}`,
      workoutTitle: routineTitle,
      category,
      exercises: activeExercises,
      currentExerciseIndex: 0,
      elapsedSeconds: 0,
      isActive: true,
      isPaused: false,
      startedAt: new Date().toISOString(),
    };

    onStartSession(session);
  };

  const startSingleExercise = (exercise: Exercise) => {
    const session: ActiveWorkoutSession = {
      id: `session-${Date.now()}`,
      workoutTitle: `${exercise.name} Focus`,
      category: exercise.category,
      exercises: [
        {
          exercise,
          sets: Array.from({ length: exercise.defaultSets }, (_, i) => ({
            setNumber: i + 1,
            reps: 10,
            weight: 30,
            completed: false,
          })),
        },
      ],
      currentExerciseIndex: 0,
      elapsedSeconds: 0,
      isActive: true,
      isPaused: false,
      startedAt: new Date().toISOString(),
    };

    onStartSession(session);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-6xl mx-auto">
      {/* Header and segmented tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#F5F6FA] tracking-tight">
            Workout Management System
          </h1>
          <p className="text-xs text-[#A4A7B2] mt-0.5">
            Calibrated routines, live interactive set tracking, and exercise library.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#181B26] border border-[#272B3B] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('routines')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'routines'
                ? 'bg-[#C6FF4D] text-[#101116] shadow-sm'
                : 'text-[#A4A7B2] hover:text-[#F5F6FA]'
            }`}
          >
            Curated Routines
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'exercises'
                ? 'bg-[#C6FF4D] text-[#101116] shadow-sm'
                : 'text-[#A4A7B2] hover:text-[#F5F6FA]'
            }`}
          >
            Exercise Library ({EXERCISES_DATABASE.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#C6FF4D] text-[#101116] shadow-sm'
                : 'text-[#A4A7B2] hover:text-[#F5F6FA]'
            }`}
          >
            History ({completedWorkouts.length})
          </button>
        </div>
      </div>

      {/* TAB 1: CURATED ROUTINES */}
      {activeTab === 'routines' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curatedRoutines.map((routine) => (
              <div
                key={routine.id}
                className="p-5 rounded-3xl bg-[#171923] border border-[#282C3D] hover:border-[#C6FF4D]/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#C6FF4D] uppercase tracking-wider">
                      {routine.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-[#A4A7B2]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#A4A7B2]" />
                        {routine.duration}
                      </span>
                      <span>·</span>
                      <span className="text-[#9B7BFF] font-medium">{routine.difficulty}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#F5F6FA] group-hover:text-[#C6FF4D] transition-colors">
                    {routine.title}
                  </h3>
                  <p className="text-xs text-[#A4A7B2] mt-1 line-clamp-2">
                    {routine.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#232737] flex items-center gap-2 text-xs text-[#A4A7B2]">
                    <Dumbbell className="w-3.5 h-3.5 text-[#C6FF4D]" />
                    <span>{routine.exerciseIds.length} Core Compound & Isolation Exercises</span>
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  <button
                    onClick={() =>
                      startRoutine(routine.title, routine.category, routine.exerciseIds)
                    }
                    className="w-full py-2.5 rounded-xl bg-[#C6FF4D] text-[#101116] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#d5ff73] active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-[#C6FF4D]/10"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start This Workout Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EXERCISE LIBRARY */}
      {activeTab === 'exercises' && (
        <div className="space-y-4">
          {/* Search bar & Level filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7082]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exercises, target muscles, equipment..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#171923] border border-[#272B3B] text-xs text-[#F5F6FA] placeholder-[#555A6E] focus:border-[#C6FF4D] focus:outline-none"
              />
            </div>

            {/* Level selection buttons */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-[#1F2332] text-[#C6FF4D] border border-[#C6FF4D]/40 font-bold'
                      : 'bg-[#171923] text-[#A4A7B2] border border-[#272B3B] hover:text-[#F5F6FA]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category horizontal pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C6FF4D] text-[#101116] font-bold'
                    : 'bg-[#181A25] text-[#A4A7B2] border border-[#262A3A] hover:text-[#F5F6FA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="p-4 rounded-2xl bg-[#171923] border border-[#262939] hover:border-[#383D54] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#A4A7B2] mb-2">
                    <span className="font-bold text-[#C6FF4D]">{exercise.category}</span>
                    <span>{exercise.level}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#F5F6FA] mb-1">{exercise.name}</h4>
                  <p className="text-xs text-[#A4A7B2]">
                    Target: <span className="text-[#F5F6FA]">{exercise.targetMuscle}</span>
                  </p>
                  <p className="text-[11px] text-[#6B7082] mt-0.5">
                    {exercise.equipment} · {exercise.defaultSets} Sets · {exercise.defaultReps}
                  </p>

                  {/* Thumbnail diagram preview */}
                  <div className="h-24 w-full bg-[#111219] rounded-xl border border-[#222533] my-3 flex items-center justify-center p-2">
                    <ExerciseGraphic type={exercise.svgType} className="max-h-full" />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#232737]">
                  <button
                    onClick={() => setSelectedExerciseDetail(exercise)}
                    className="flex-1 py-1.5 rounded-lg bg-[#202330] border border-[#2B2F40] text-xs font-semibold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Guide & Form</span>
                  </button>

                  <button
                    onClick={() => startSingleExercise(exercise)}
                    className="px-3 py-1.5 rounded-lg bg-[#C6FF4D] text-[#101116] text-xs font-bold hover:bg-[#d5ff73] flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Train</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="p-8 text-center bg-[#171923] border border-[#262939] rounded-2xl">
              <p className="text-sm text-[#A4A7B2]">No exercises match your filter criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: WORKOUT HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {completedWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="p-4 rounded-2xl bg-[#171923] border border-[#262A3A] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C6FF4D]/15 border border-[#C6FF4D]/30 flex items-center justify-center text-[#C6FF4D] shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#F5F6FA]">{workout.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#A4A7B2] mt-0.5">
                    <span>{new Date(workout.date).toLocaleDateString()}</span>
                    <span>·</span>
                    <span className="text-[#C6FF4D] font-semibold">{workout.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-[#6B7082] block text-[10px] uppercase">Duration</span>
                  <span className="font-tabular font-bold text-[#F5F6FA]">
                    {workout.durationMinutes} min
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7082] block text-[10px] uppercase">Total Sets</span>
                  <span className="font-tabular font-bold text-[#F5F6FA]">{workout.totalSets}</span>
                </div>
                <div>
                  <span className="text-[#6B7082] block text-[10px] uppercase">Volume</span>
                  <span className="font-tabular font-bold text-[#C6FF4D]">
                    {workout.totalVolumeKg.toLocaleString()} kg
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7082] block text-[10px] uppercase">Burn</span>
                  <span className="font-tabular font-bold text-[#FF7043]">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>
              </div>
            </div>
          ))}

          {completedWorkouts.length === 0 && (
            <div className="p-8 text-center bg-[#171923] border border-[#262939] rounded-2xl">
              <Trophy className="w-8 h-8 text-[#6B7082] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#F5F6FA]">No completed workouts recorded yet.</p>
              <p className="text-xs text-[#A4A7B2] mt-1">Start a curated routine to log your first session!</p>
            </div>
          )}
        </div>
      )}

      {/* DETAILED EXERCISE MODAL */}
      {selectedExerciseDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#181A25] border border-[#2A2E3F] rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#C6FF4D] uppercase">
                  {selectedExerciseDetail.category} · {selectedExerciseDetail.level}
                </span>
                <h3 className="text-2xl font-black text-[#F5F6FA]">{selectedExerciseDetail.name}</h3>
                <p className="text-xs text-[#A4A7B2]">
                  Target: {selectedExerciseDetail.targetMuscle} · Equipment: {selectedExerciseDetail.equipment}
                </p>
              </div>
              <button
                onClick={() => setSelectedExerciseDetail(null)}
                className="text-lg text-[#6B7082] hover:text-[#F5F6FA] p-1 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {/* Illustration */}
            <div className="h-44 w-full bg-[#111218] rounded-2xl border border-[#232737] p-3 flex items-center justify-center">
              <ExerciseGraphic type={selectedExerciseDetail.svgType} className="max-h-full" />
            </div>

            {/* Step by Step Execution */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#F5F6FA] uppercase tracking-wider">
                Execution Instructions
              </h4>
              <ol className="text-xs text-[#A4A7B2] space-y-2 list-decimal list-inside bg-[#13141C] p-3.5 rounded-xl border border-[#222533]">
                {selectedExerciseDetail.instructions.map((inst, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {inst}
                  </li>
                ))}
              </ol>
            </div>

            {/* Safety Tips */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#FF7043] uppercase tracking-wider flex items-center gap-1">
                <span>Critical Safety Rules</span>
              </h4>
              <ul className="text-xs text-[#A4A7B2] space-y-1.5 list-disc list-inside bg-[#1F171A] p-3.5 rounded-xl border border-[#3E252A]">
                {selectedExerciseDetail.safetyTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                const ex = selectedExerciseDetail;
                setSelectedExerciseDetail(null);
                startSingleExercise(ex);
              }}
              className="w-full py-3 rounded-xl bg-[#C6FF4D] text-[#101116] font-bold text-xs tracking-wide hover:bg-[#d5ff73] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#C6FF4D]/15"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Exercise Session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
