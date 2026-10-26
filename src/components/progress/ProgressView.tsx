import React, { useState } from 'react';
import {
  UserProfile,
  WeightRecord,
  PersonalRecord,
  CompletedWorkout,
} from '../../types';
import { StorageService } from '../../services/storageService';
import {
  TrendingUp,
  Plus,
  Trash2,
  Download,
  Trophy,
  Scale,
  Award,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface ProgressViewProps {
  userProfile: UserProfile;
  weightRecords: WeightRecord[];
  onAddWeightRecord: (record: WeightRecord) => void;
  onDeleteWeightRecord: (id: string) => void;
  personalRecords: PersonalRecord[];
  onAddPersonalRecord: (record: PersonalRecord) => void;
  completedWorkouts: CompletedWorkout[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  userProfile,
  weightRecords,
  onAddWeightRecord,
  onDeleteWeightRecord,
  personalRecords,
  onAddPersonalRecord,
  completedWorkouts,
}) => {
  const [isAddWeightOpen, setIsAddWeightOpen] = useState(false);
  const [newWeight, setNewWeight] = useState<number>(userProfile.weight || 75);
  const [newBodyFat, setNewBodyFat] = useState<number>(15);
  const [newWeightDate, setNewWeightDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [newWeightNotes, setNewWeightNotes] = useState<string>('');

  const [isAddPROpen, setIsAddPROpen] = useState(false);
  const [prExerciseName, setPrExerciseName] = useState('Barbell Flat Bench Press');
  const [prWeight, setPrWeight] = useState<number>(100);
  const [prReps, setPrReps] = useState<number>(5);

  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Sort weight records chronologically
  const sortedWeights = [...weightRecords].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const latestWeight = sortedWeights.length > 0 ? sortedWeights[sortedWeights.length - 1].weight : userProfile.weight;
  const initialWeight = sortedWeights.length > 0 ? sortedWeights[0].weight : userProfile.weight;
  const weightDelta = Math.round((latestWeight - initialWeight) * 10) / 10;

  // Total volume calculation across all workouts
  const totalVolumeAllTime = completedWorkouts.reduce((acc, w) => acc + w.totalVolumeKg, 0);
  const totalMinutesAllTime = completedWorkouts.reduce((acc, w) => acc + w.durationMinutes, 0);

  // SVG Chart points calculation
  const minWeight = Math.min(...sortedWeights.map((w) => w.weight), latestWeight - 2);
  const maxWeight = Math.max(...sortedWeights.map((w) => w.weight), latestWeight + 2);
  const weightRange = maxWeight - minWeight || 1;

  const chartPoints = sortedWeights.map((rec, index) => {
    const x = sortedWeights.length > 1 ? (index / (sortedWeights.length - 1)) * 360 + 20 : 200;
    const y = 140 - ((rec.weight - minWeight) / weightRange) * 100;
    return { x, y, weight: rec.weight, date: rec.date };
  });

  const pathD = chartPoints.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: WeightRecord = {
      id: `wr-${Date.now()}`,
      weight: Number(newWeight),
      bodyFatPercentage: newBodyFat ? Number(newBodyFat) : undefined,
      date: newWeightDate,
      notes: newWeightNotes.trim() || undefined,
    };
    onAddWeightRecord(newRecord);
    setIsAddWeightOpen(false);
    setNewWeightNotes('');
  };

  const handleSavePR = (e: React.FormEvent) => {
    e.preventDefault();
    const pr: PersonalRecord = {
      id: `pr-${Date.now()}`,
      exerciseName: prExerciseName,
      maxWeightKg: Number(prWeight),
      reps: Number(prReps),
      date: new Date().toISOString().split('T')[0],
    };
    onAddPersonalRecord(pr);
    setIsAddPROpen(false);
  };

  const handleExportData = () => {
    const jsonStr = StorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitnova_athlete_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice('Athlete telemetry & logs successfully exported as JSON.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-6xl mx-auto">
      {/* Header and Export CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#F5F6FA] tracking-tight">
            Progress Tracking & Analytics
          </h1>
          <p className="text-xs text-[#A4A7B2] mt-0.5">
            Historical weight curve, personal records (PRs), and all-time training volume.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="px-4 py-2 rounded-xl bg-[#171923] border border-[#2B2F40] text-xs font-semibold text-[#F5F6FA] hover:border-[#C6FF4D] hover:text-[#C6FF4D] transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#C6FF4D]" />
          <span>Export Athlete Data</span>
        </button>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-xl bg-[#C6FF4D]/15 border border-[#C6FF4D]/40 text-xs text-[#C6FF4D] animate-fadeIn">
          {exportNotice}
        </div>
      )}

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#171923] border border-[#262A3B]">
          <div className="text-[11px] text-[#A4A7B2] uppercase font-bold flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#C6FF4D]" />
            <span>Current Weight</span>
          </div>
          <div className="font-tabular font-black text-2xl text-[#F5F6FA] mt-1">
            {latestWeight} kg
          </div>
          <div className="flex items-center gap-1 text-[11px] mt-1 font-semibold text-[#A4A7B2]">
            {weightDelta >= 0 ? (
              <span className="text-[#C6FF4D] flex items-center">
                <ArrowUpRight className="w-3 h-3" />+{weightDelta} kg
              </span>
            ) : (
              <span className="text-[#54A0FF] flex items-center">
                <ArrowDownRight className="w-3 h-3" />
                {weightDelta} kg
              </span>
            )}
            <span>since baseline</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#171923] border border-[#262A3B]">
          <div className="text-[11px] text-[#A4A7B2] uppercase font-bold flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-[#9B7BFF]" />
            <span>Lifetime Volume</span>
          </div>
          <div className="font-tabular font-black text-2xl text-[#F5F6FA] mt-1">
            {totalVolumeAllTime.toLocaleString()} kg
          </div>
          <div className="text-[11px] text-[#A4A7B2] mt-1">Total weight moved</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#171923] border border-[#262A3B]">
          <div className="text-[11px] text-[#A4A7B2] uppercase font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#C6FF4D]" />
            <span>Workouts Done</span>
          </div>
          <div className="font-tabular font-black text-2xl text-[#F5F6FA] mt-1">
            {completedWorkouts.length} Sessions
          </div>
          <div className="text-[11px] text-[#A4A7B2] mt-1">Consistent execution</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#171923] border border-[#262A3B]">
          <div className="text-[11px] text-[#A4A7B2] uppercase font-bold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#FF7043]" />
            <span>Active Training</span>
          </div>
          <div className="font-tabular font-black text-2xl text-[#F5F6FA] mt-1">
            {totalMinutesAllTime} min
          </div>
          <div className="text-[11px] text-[#A4A7B2] mt-1">Total time under bar</div>
        </div>
      </div>

      {/* Weight Progression Chart */}
      <div className="p-6 rounded-3xl bg-[#171923] border border-[#262A3B] space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C6FF4D]">
              Physique Trajectory
            </span>
            <h3 className="text-lg font-bold text-[#F5F6FA]">Weight Progression Trend</h3>
          </div>

          <button
            onClick={() => setIsAddWeightOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#C6FF4D] text-[#101116] text-xs font-bold hover:bg-[#d5ff73] flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Weight</span>
          </button>
        </div>

        {/* SVG Curve Chart */}
        <div className="w-full h-56 bg-[#111219] rounded-2xl border border-[#222533] p-4 flex flex-col justify-between relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="20" y1="40" x2="380" y2="40" stroke="#222533" strokeDasharray="4 4" />
            <line x1="20" y1="90" x2="380" y2="90" stroke="#222533" strokeDasharray="4 4" />
            <line x1="20" y1="140" x2="380" y2="140" stroke="#222533" strokeDasharray="4 4" />

            {/* Weight curve stroke */}
            {chartPoints.length > 1 && (
              <path
                d={pathD}
                fill="none"
                stroke="#C6FF4D"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data points */}
            {chartPoints.map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="5" fill="#101116" stroke="#C6FF4D" strokeWidth="2.5" />
                <text
                  x={pt.x}
                  y={pt.y - 10}
                  fill="#F5F6FA"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {pt.weight}kg
                </text>
              </g>
            ))}
          </svg>

          {/* Date labels */}
          <div className="flex justify-between text-[10px] text-[#6B7082] px-3 font-mono">
            {sortedWeights.map((w, idx) => (
              <span key={idx}>{w.date.slice(5)}</span>
            ))}
          </div>
        </div>

        {/* Weight Log Table */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-[#A4A7B2] uppercase tracking-wider">
            Weight Log History
          </h4>
          <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
            {sortedWeights
              .slice()
              .reverse()
              .map((rec) => (
                <div
                  key={rec.id}
                  className="p-2.5 rounded-xl bg-[#12131A] border border-[#222533] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#A4A7B2] font-mono">{rec.date}</span>
                    <span className="font-tabular font-bold text-[#F5F6FA]">{rec.weight} kg</span>
                    {rec.bodyFatPercentage && (
                      <span className="text-[11px] text-[#9B7BFF]">
                        {rec.bodyFatPercentage}% body fat
                      </span>
                    )}
                    {rec.notes && (
                      <span className="text-[11px] text-[#6B7082] italic">"{rec.notes}"</span>
                    )}
                  </div>

                  <button
                    onClick={() => onDeleteWeightRecord(rec.id)}
                    className="text-[#6B7082] hover:text-[#FF6B6B] p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Personal Records (PRs) Leaderboard */}
      <div className="p-6 rounded-3xl bg-[#171923] border border-[#262A3B] space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9B7BFF]">
              Strength Benchmarks
            </span>
            <h3 className="text-lg font-bold text-[#F5F6FA]">Personal Records (PRs)</h3>
          </div>

          <button
            onClick={() => setIsAddPROpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#9B7BFF] text-[#101116] text-xs font-bold hover:bg-[#b096ff] flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New PR</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {personalRecords.map((pr) => (
            <div
              key={pr.id}
              className="p-4 rounded-2xl bg-[#12131A] border border-[#242738] flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-[#F5F6FA]">{pr.exerciseName}</div>
                <div className="text-[11px] text-[#A4A7B2] mt-0.5">
                  Logged on {pr.date} · {pr.reps} Reps
                </div>
              </div>

              <div className="text-right">
                <span className="font-tabular font-black text-xl text-[#C6FF4D] block">
                  {pr.maxWeightKg} kg
                </span>
                <span className="text-[10px] text-[#9B7BFF] uppercase tracking-wider font-bold">
                  PR Record
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LOG WEIGHT MODAL */}
      {isAddWeightOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#181A25] border border-[#2A2E3F] rounded-3xl p-6 shadow-2xl relative space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#F5F6FA]">Log Weight Entry</h3>
              <button
                onClick={() => setIsAddWeightOpen(false)}
                className="text-lg font-bold text-[#6B7082] hover:text-[#F5F6FA] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveWeight} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-sm text-[#F5F6FA] font-tabular focus:border-[#C6FF4D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">
                  Estimated Body Fat % (optional)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={newBodyFat}
                  onChange={(e) => setNewBodyFat(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-sm text-[#F5F6FA] font-tabular focus:border-[#C6FF4D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={newWeightDate}
                  onChange={(e) => setNewWeightDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] font-mono focus:border-[#C6FF4D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">
                  Notes (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Morning fasted"
                  value={newWeightNotes}
                  onChange={(e) => setNewWeightNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] focus:border-[#C6FF4D] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-[#C6FF4D] text-[#101116] font-bold text-xs hover:bg-[#d5ff73] transition-all cursor-pointer"
              >
                Save Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LOG PR MODAL */}
      {isAddPROpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#181A25] border border-[#2A2E3F] rounded-3xl p-6 shadow-2xl relative space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#F5F6FA]">Add Personal Record</h3>
              <button
                onClick={() => setIsAddPROpen(false)}
                className="text-lg font-bold text-[#6B7082] hover:text-[#F5F6FA] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePR} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">
                  Exercise Name
                </label>
                <select
                  value={prExerciseName}
                  onChange={(e) => setPrExerciseName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] focus:border-[#9B7BFF] focus:outline-none cursor-pointer"
                >
                  <option value="Barbell Flat Bench Press">Barbell Flat Bench Press</option>
                  <option value="Barbell Back Squat">Barbell Back Squat</option>
                  <option value="Conventional Barbell Deadlift">Conventional Barbell Deadlift</option>
                  <option value="Overhead Barbell Military Press">Overhead Barbell Military Press</option>
                  <option value="Incline Dumbbell Press">Incline Dumbbell Press</option>
                  <option value="Weighted Pull-ups">Weighted Pull-ups</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">
                    Max Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={prWeight}
                    onChange={(e) => setPrWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-sm text-[#F5F6FA] font-tabular focus:border-[#9B7BFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">Reps</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={prReps}
                    onChange={(e) => setPrReps(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-sm text-[#F5F6FA] font-tabular focus:border-[#9B7BFF] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-[#9B7BFF] text-[#101116] font-bold text-xs hover:bg-[#b096ff] transition-all cursor-pointer"
              >
                Log Benchmark
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
