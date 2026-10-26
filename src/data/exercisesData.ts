import { Exercise } from '../types';

export const EXERCISES_DATABASE: Exercise[] = [
  // CHEST
  {
    id: 'ex-chest-1',
    name: 'Barbell Flat Bench Press',
    category: 'Chest',
    level: 'Intermediate',
    targetMuscle: 'Pectoralis Major',
    secondaryMuscles: ['Anterior Deltoids', 'Triceps Brachii'],
    equipment: 'Barbell & Flat Bench',
    defaultSets: 4,
    defaultReps: '8-10 reps',
    restDurationSeconds: 90,
    caloriesBurnEstimate: 45,
    svgType: 'push',
    instructions: [
      'Lie flat on the bench with feet firmly planted on the floor and eyes directly under the racked bar.',
      'Grip the bar slightly wider than shoulder-width with a firm overhand grip and wrap your thumbs.',
      'Retract your scapulae (pull shoulder blades together and down) and maintain a slight natural arch in the lower back.',
      'Unrack the bar and slowly lower it in a controlled arc to your lower sternum/mid-chest over 2–3 seconds.',
      'Press explosively upward without bouncing off your ribs until your arms are extended, keeping wrists straight.'
    ],
    safetyTips: [
      'Never bounce the bar off your chest; maintain full muscular tension at the bottom.',
      'Keep your elbows tucked at roughly a 45–70 degree angle to your torso, avoiding flaring 90 degrees.',
      'Always use a secure grip with thumbs wrapped around the bar (never use a thumbless suicide grip).'
    ]
  },
  {
    id: 'ex-chest-2',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    level: 'Intermediate',
    targetMuscle: 'Upper Pectorals (Clavicular Head)',
    secondaryMuscles: ['Front Delts', 'Triceps'],
    equipment: 'Incline Bench (30-45°) & Dumbbells',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    restDurationSeconds: 75,
    caloriesBurnEstimate: 40,
    svgType: 'push',
    instructions: [
      'Set an adjustable bench to a 30 to 45 degree angle. Sit with dumbbells resting on your thighs.',
      'Kick the weights up using your knees as you lean back onto the bench into a secure pressing position.',
      'Lower the dumbbells steadily down to chest level with elbows tucked at roughly 60 degrees.',
      'Drive the dumbbells upward and slightly inward along a natural converging arc without clanking the weights.'
    ],
    safetyTips: [
      'Avoid setting bench angle too steep (>45°) as it shifts excessive strain onto the anterior deltoids.',
      'Plant your feet firmly on the ground to provide strong core stability.'
    ]
  },
  {
    id: 'ex-chest-3',
    name: 'Push-Ups (Strict Form)',
    category: 'Chest',
    level: 'Beginner',
    targetMuscle: 'Mid & Lower Pectorals',
    secondaryMuscles: ['Core', 'Triceps', 'Shoulders'],
    equipment: 'Bodyweight',
    defaultSets: 3,
    defaultReps: '15-20 reps',
    restDurationSeconds: 60,
    caloriesBurnEstimate: 30,
    svgType: 'push',
    instructions: [
      'Begin in a high plank position with hands slightly wider than shoulder-width apart.',
      'Engage your glutes, brace your core, and align your body in a rigid straight line from head to heels.',
      'Lower your chest until it is approximately 2 inches above the ground while inhaling.',
      'Push forcefully away from the floor back to full lockout, spreading your upper back slightly at the top.'
    ],
    safetyTips: [
      'Prevent hips from sagging or piking up by keeping your glutes clenched throughout the movement.',
      'Look slightly forward on the floor to maintain neutral cervical spine alignment.'
    ]
  },

  // BACK
  {
    id: 'ex-back-1',
    name: 'Conventional Barbell Deadlift',
    category: 'Back',
    level: 'Advanced',
    targetMuscle: 'Erector Spinae & Latissimus Dorsi',
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Traps', 'Forearms'],
    equipment: 'Olympic Barbell & Bumper Plates',
    defaultSets: 4,
    defaultReps: '5-6 reps',
    restDurationSeconds: 120,
    caloriesBurnEstimate: 60,
    svgType: 'pull',
    instructions: [
      'Stand with feet hip-width apart, barbell cutting across the middle of your shoelaces.',
      'Hinge at hips, bend knees slightly, and grip the bar just outside your shins.',
      'Pull your chest up, depress your shoulder blades, pull the slack out of the barbell, and build intra-abdominal pressure.',
      'Drive the floor away through your heels, keeping the bar glued against your shins and thighs until you reach an upright lockout.'
    ],
    safetyTips: [
      'Never round your lumbar spine under heavy loads; keep a flat, neutral back.',
      'Do not hyperextend backwards at the top; lock out with glutes and hips square.'
    ]
  },
  {
    id: 'ex-back-2',
    name: 'Wide-Grip Lat Pulldown',
    category: 'Back',
    level: 'Beginner',
    targetMuscle: 'Latissimus Dorsi (Lats)',
    secondaryMuscles: ['Biceps', 'Rhomboids', 'Rear Delts'],
    equipment: 'Cable Lat Machine',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    restDurationSeconds: 60,
    caloriesBurnEstimate: 35,
    svgType: 'pull',
    instructions: [
      'Adjust thigh pads so your legs fit snugly. Grip the bar wider than shoulder-width with an overhand grip.',
      'Sit down, maintain an upright posture with a very subtle 10-degree lean back from your hips.',
      'Initiate the pull by drawing your shoulder blades down and driving your elbows down toward your back pockets.',
      'Touch the bar smoothly to your upper collarbone, pause for a 1-second peak squeeze, and control the release up.'
    ],
    safetyTips: [
      'Avoid swinging your whole torso to generate momentum.',
      'Never pull the bar behind your neck, which places harmful torque on the rotator cuffs.'
    ]
  },
  {
    id: 'ex-back-3',
    name: 'Seated Cable Row',
    category: 'Back',
    level: 'Intermediate',
    targetMuscle: 'Rhomboids & Mid-Back',
    secondaryMuscles: ['Lats', 'Biceps', 'Posterior Deltoids'],
    equipment: 'Low Cable Row Machine',
    defaultSets: 3,
    defaultReps: '12 reps',
    restDurationSeconds: 60,
    caloriesBurnEstimate: 35,
    svgType: 'pull',
    instructions: [
      'Sit on the bench with feet resting against footrests and knees slightly unlocked.',
      'Grasp the close-grip V-handle, sit upright with a neutral chest, and pull the handle toward your lower abdomen.',
      'Squeeze your scapulae tightly together as the handle approaches your torso.',
      'Return the weight in a slow, controlled motion without letting your shoulders slouch forward.'
    ],
    safetyTips: [
      'Keep knees softly bent throughout to prevent excessive tension on the lower back.',
      'Do not rock aggressively back and forth.'
    ]
  },

  // SHOULDERS
  {
    id: 'ex-shoulders-1',
    name: 'Overhead Barbell Military Press',
    category: 'Shoulders',
    level: 'Intermediate',
    targetMuscle: 'Anterior & Lateral Deltoids',
    secondaryMuscles: ['Triceps', 'Upper Trapezius', 'Core'],
    equipment: 'Barbell & Squat Rack',
    defaultSets: 4,
    defaultReps: '6-8 reps',
    restDurationSeconds: 90,
    caloriesBurnEstimate: 40,
    svgType: 'push',
    instructions: [
      'Rerack the barbell at upper chest height. Grip slightly wider than shoulder-width with forearms vertical.',
      'Unrack, step back, squeeze glutes and brace your abs to form a rock-solid foundation.',
      'Tilt your head back slightly to clear the chin path, then press the bar straight vertically overhead.',
      'Once the bar clears your forehead, move your head through the "window" into full lockout directly above your shoulders.'
    ],
    safetyTips: [
      'Do not arch your lower back backwards; keep your ribcage pinned down and core tight.',
      'Lower under complete control back to collarbone level.'
    ]
  },
  {
    id: 'ex-shoulders-2',
    name: 'Dumbbell Lateral Raises',
    category: 'Shoulders',
    level: 'Beginner',
    targetMuscle: 'Lateral Deltoids (Side Delts)',
    secondaryMuscles: ['Upper Traps'],
    equipment: 'Dumbbells',
    defaultSets: 4,
    defaultReps: '12-15 reps',
    restDurationSeconds: 45,
    caloriesBurnEstimate: 25,
    svgType: 'push',
    instructions: [
      'Stand with feet shoulder-width apart, holding light dumbbells at your sides with a slight elbow bend.',
      'Hinge forward roughly 10 degrees at the waist.',
      'Raise the dumbbells outward in the scapular plane (roughly 30 degrees in front of direct side) until parallel with the floor.',
      'Lead with your elbows and maintain pinkies slightly higher than thumbs for optimal side delt recruitment.'
    ],
    safetyTips: [
      'Use modest weights; excessive momentum recruits upper traps rather than target side delts.',
      'Avoid shrugging your neck upward during the lift.'
    ]
  },

  // LEGS
  {
    id: 'ex-legs-1',
    name: 'Barbell Back Squat',
    category: 'Legs',
    level: 'Intermediate',
    targetMuscle: 'Quadriceps & Gluteus Maximus',
    secondaryMuscles: ['Hamstrings', 'Adductors', 'Core'],
    equipment: 'Olympic Barbell & Squat Rack',
    defaultSets: 4,
    defaultReps: '8-10 reps',
    restDurationSeconds: 120,
    caloriesBurnEstimate: 60,
    svgType: 'legs',
    instructions: [
      'Step under the bar resting it across the upper trapezius (high bar) or across rear deltoids (low bar).',
      'Step back 2 paces, set feet shoulder-width apart with toes flared out 15–30 degrees.',
      'Take a deep diaphragmatic breath into your belly, brace hard, and break simultaneously at hips and knees.',
      'Squat down until hip crease descends below top of knee caps (parallel depth), keeping knees tracking in line with toes.',
      'Drive powerfully up through mid-foot to starting stance.'
    ],
    safetyTips: [
      'Ensure knees do not cave inward (valgus collapse); push knees outward over toes.',
      'Keep your heel and big toe firmly planted (tripod foot).'
    ]
  },
  {
    id: 'ex-legs-2',
    name: 'Romanian Deadlift (RDL)',
    category: 'Legs',
    level: 'Intermediate',
    targetMuscle: 'Hamstrings & Posterior Chain',
    secondaryMuscles: ['Glutes', 'Lower Back'],
    equipment: 'Barbell or Dumbbells',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    restDurationSeconds: 75,
    caloriesBurnEstimate: 45,
    svgType: 'legs',
    instructions: [
      'Hold the barbell with an overhand grip at hip height, feet hip-width apart and knees soft (slightly bent 15°).',
      'Push your hips backward as if trying to touch the wall behind you, keeping shins nearly vertical.',
      'Glide the bar down close to your thighs until you feel a deep, intense stretch across your hamstrings (usually mid-shin).',
      'Drive hips forward and contract glutes forcefully to return upright.'
    ],
    safetyTips: [
      'Do not squat down; this is a pure hip hinge movement.',
      'Maintain an unbroken flat back throughout; do not round over the bar.'
    ]
  },
  {
    id: 'ex-legs-3',
    name: 'Bulgarian Split Squat',
    category: 'Legs',
    level: 'Advanced',
    targetMuscle: 'Quadriceps, Glutes & Stabilizers',
    secondaryMuscles: ['Hamstrings', 'Calves'],
    equipment: 'Bench & Pair of Dumbbells',
    defaultSets: 3,
    defaultReps: '10 reps each leg',
    restDurationSeconds: 75,
    caloriesBurnEstimate: 50,
    svgType: 'legs',
    instructions: [
      'Stand about two feet in front of a flat workout bench.',
      'Reach one foot backward and rest the top of your foot laces-down on the bench surface.',
      'Lower your hips straight down toward the ground until front thigh is parallel to the floor.',
      'Drive through the heel of the front foot to return to the starting position.'
    ],
    safetyTips: [
      'Ensure front foot is positioned far enough forward so front knee stays aligned above ankle.',
      'Maintain an upright torso to bias quads or lean slightly forward to bias glutes.'
    ]
  },

  // ARMS: BICEPS & TRICEPS
  {
    id: 'ex-biceps-1',
    name: 'EZ-Bar Bicep Curl',
    category: 'Biceps',
    level: 'Beginner',
    targetMuscle: 'Biceps Brachii',
    secondaryMuscles: ['Brachialis', 'Brachioradialis'],
    equipment: 'EZ-Bar & Weight Plates',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    restDurationSeconds: 60,
    caloriesBurnEstimate: 25,
    svgType: 'arms',
    instructions: [
      'Grasp the undulating inner curves of an EZ curl bar with an underhand grip.',
      'Pin your elbows tight by your ribcage, stand tall with shoulder blades pinned back.',
      'Curl the bar upward toward your shoulders, squeezing your biceps hard at the peak of the movement.',
      'Lower the bar slowly for 2–3 seconds until arms are fully extended at the bottom.'
    ],
    safetyTips: [
      'Do not sway your lower back or swing your hips to hoist the weight.',
      'Keep wrists rigid and locked; avoid curling your wrists inward.'
    ]
  },
  {
    id: 'ex-triceps-1',
    name: 'Tricep Rope Pushdown',
    category: 'Triceps',
    level: 'Beginner',
    targetMuscle: 'Triceps (Lateral & Medial Heads)',
    secondaryMuscles: ['Forearms'],
    equipment: 'High Cable Pulley & Rope Attachment',
    defaultSets: 3,
    defaultReps: '12-15 reps',
    restDurationSeconds: 45,
    caloriesBurnEstimate: 25,
    svgType: 'arms',
    instructions: [
      'Attach a rope to a high cable pulley. Grasp both ends with a neutral grip and lean forward slightly.',
      'Pin your elbows to the sides of your torso and maintain this fixed elbow pivot point.',
      'Push the rope downward using pure tricep contraction until your arms are fully locked out.',
      'Spread the rope ends apart at the bottom for an intense peak contraction on the lateral head.'
    ],
    safetyTips: [
      'Do not let your elbows drift forward and back; keep them glued in position.',
      'Control the return weight; do not let the stack slam.'
    ]
  },

  // ABS / CORE
  {
    id: 'ex-abs-1',
    name: 'Hanging Leg Raises',
    category: 'Abs',
    level: 'Intermediate',
    targetMuscle: 'Rectus Abdominis & Deep Core',
    secondaryMuscles: ['Hip Flexors', 'Grip Strength'],
    equipment: 'Pull-Up Bar',
    defaultSets: 3,
    defaultReps: '12-15 reps',
    restDurationSeconds: 60,
    caloriesBurnEstimate: 30,
    svgType: 'core',
    instructions: [
      'Hang from a pull-up bar with an overhand grip, arms straight and body still.',
      'Tilt your pelvis backward to engage your lower abs.',
      'Raise your legs in front of you until they are at least parallel to the floor (or touch the bar for advanced trainees).',
      'Lower with strict control without swinging or kicking with momentum.'
    ],
    safetyTips: [
      'Do not swing like a pendulum; pause at the bottom to reset each rep.',
      'If straight legs are too difficult, start with hanging knee tucks.'
    ]
  },
  {
    id: 'ex-abs-2',
    name: 'Core Plank Hold',
    category: 'Abs',
    level: 'Beginner',
    targetMuscle: 'Transverse Abdominis & Anterior Core',
    secondaryMuscles: ['Glutes', 'Deltoids', 'Quadriceps'],
    equipment: 'Mat / Bodyweight',
    defaultSets: 3,
    defaultReps: '45-60 seconds',
    restDurationSeconds: 45,
    caloriesBurnEstimate: 20,
    svgType: 'core',
    instructions: [
      'Rest on your forearms with elbows placed directly underneath your shoulders.',
      'Extend legs straight behind you, resting on the balls of your toes.',
      'Tuck your tailbone, squeeze your glutes, and draw your belly button in tight toward your spine.',
      'Maintain a rigid horizontal line from crown of head to ankles without dipping hips.'
    ],
    safetyTips: [
      'Do not allow lower back to sag, which compresses lumbar vertebrae.',
      'Breathe smoothly; do not hold your breath during the static isometric hold.'
    ]
  },

  // FULL BODY
  {
    id: 'ex-full-1',
    name: 'Kettlebell Russian Swings',
    category: 'Full Body',
    level: 'Beginner',
    targetMuscle: 'Posterior Chain, Glutes & Core',
    secondaryMuscles: ['Shoulders', 'Lats', 'Grip'],
    equipment: 'Kettlebell',
    defaultSets: 4,
    defaultReps: '15-20 reps',
    restDurationSeconds: 60,
    caloriesBurnEstimate: 50,
    svgType: 'legs',
    instructions: [
      'Stand with feet shoulder-width apart, kettlebell placed on the floor one foot in front of you.',
      'Hinge at hips, reach forward, grasp handle with both hands, and hike kettlebell back between your thighs.',
      'Drive hips forcefully forward in an explosive snap, propelling the bell up to chest height.',
      'Let the kettlebell float at the top, then guide it down into the next smooth hinge.'
    ],
    safetyTips: [
      'The swing is powered by the hips and glutes, NOT by lifting with your arms or shoulders.',
      'Never round your spine during the hike.'
    ]
  },

  // CARDIO
  {
    id: 'ex-cardio-1',
    name: 'High-Intensity Interval Sprint (HIIT)',
    category: 'Cardio',
    level: 'Intermediate',
    targetMuscle: 'Cardiovascular System & Quads',
    secondaryMuscles: ['Calves', 'Hamstrings', 'Core'],
    equipment: 'Treadmill, Track or Open Floor',
    defaultSets: 6,
    defaultReps: '30s sprint / 45s walk',
    restDurationSeconds: 45,
    caloriesBurnEstimate: 80,
    svgType: 'cardio',
    instructions: [
      'Perform a 3-minute dynamic warm-up to elevate heart rate and lubricate joints.',
      'Sprint at 90-95% maximum effort for 30 seconds with powerful arm drive and high knee lift.',
      'Decelerate safely into a 45-second slow recovery walk.',
      'Repeat for the prescribed rounds, focusing on deep nasal breathing during recovery intervals.'
    ],
    safetyTips: [
      'Ensure proper running shoes with supportive cushioning.',
      'Gradually build speed rather than attempting 100% all-out from a cold start.'
    ]
  }
];
