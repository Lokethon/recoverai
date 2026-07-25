export const INITIAL_USER_PROFILE = {
  name: "Member",
  email: "user@example.com",
  age: 28,
  recoveryStreak: 37,
  startDate: "2026-06-18",
  addictionType: "Alcohol & Nicotine",
  supportMeetingsAttended: 14,
  waterIntakeLiters: 2.4,
  waterGoalLiters: 3.0,
  latestVitals: {
    bloodPressure: "118/76",
    systolicBP: 118,
    diastolicBP: 76,
    spo2: 98,
    heartRate: 68,
    hrvMs: 62,
    sleepHours: 7.5,
    exerciseMins: 35,
    withdrawalIndex: "0/10 (Stable)",
    updatedAt: "Jul 25, 2026 - 11:30 AM"
  },
  trustedContact: {
    name: "Priya (Sister)",
    relation: "Sister & Primary Caregiver",
    phone: "+1 (555) 382-9910",
    whatsapp: "+15553829910"
  },
  therapistContact: {
    name: "Dr. Ananya Sharma",
    relation: "Addiction Specialist",
    phone: "+1 (555) 901-4433",
    whatsapp: "+15559014433"
  },
  emergencyHelplines: [
    { name: "National Rehab & Helpline (SAMHSA)", phone: "988", description: "24/7 Free & Confidential Support" },
    { name: "Crisis Text Line", phone: "741741", description: "Text HOME to 741741 for Instant SMS Support" },
    { name: "Suicide & Crisis Lifeline", phone: "988", description: "Free emotional crisis prevention dialer" }
  ]
};

export const CLINICAL_VITAL_SERIES = [
  { day: "Jul 19", bpSystolic: 128, heartRate: 78, spo2: 96, sleepHrs: 6.2, hrvMs: 44 },
  { day: "Jul 20", bpSystolic: 124, heartRate: 74, spo2: 97, sleepHrs: 6.8, hrvMs: 50 },
  { day: "Jul 21", bpSystolic: 130, heartRate: 82, spo2: 95, sleepHrs: 5.5, hrvMs: 38 },
  { day: "Jul 22", bpSystolic: 122, heartRate: 72, spo2: 97, sleepHrs: 7.0, hrvMs: 55 },
  { day: "Jul 23", bpSystolic: 120, heartRate: 70, spo2: 98, sleepHrs: 7.4, hrvMs: 58 },
  { day: "Jul 24", bpSystolic: 125, heartRate: 76, spo2: 96, sleepHrs: 6.0, hrvMs: 48 },
  { day: "Jul 25", bpSystolic: 118, heartRate: 68, spo2: 98, sleepHrs: 7.5, hrvMs: 62 }
];

export const NEARBY_HOSPITALS = [
  {
    id: "hosp-1",
    name: "City Addiction & Rehabilitation Medical Center",
    address: "742 Evergreen Terrace, Medical District",
    distance: "1.2 miles away",
    phone: "+1 (555) 492-8811",
    status: "Open 24/7 Emergency ER",
    rating: "4.9 ★",
    type: "Rehab & Psychiatric Crisis ER"
  },
  {
    id: "hosp-2",
    name: "St. Jude Mental Health & Recovery Hospital",
    address: "1098 Beacon St, Suite 400",
    distance: "2.8 miles away",
    phone: "+1 (555) 381-0022",
    status: "Open 24/7 ER",
    rating: "4.8 ★",
    type: "Substance Detox & Inpatient Unit"
  },
  {
    id: "hosp-3",
    name: "General Community Hospital Emergency Room",
    address: "500 University Ave, Main Gate",
    distance: "3.5 miles away",
    phone: "+1 (555) 911-0000",
    status: "Open 24/7 Trauma ER",
    rating: "4.7 ★",
    type: "Full Emergency Room & Detox"
  }
];

export const HEALTH_RECOVERY_MILESTONES = [
  {
    id: "m-24h",
    timeframe: "24 Hours Clean",
    title: "Blood Oxygen & Heart Rate Normalize",
    description: "Carbon monoxide clears from blood; pulse rate drops to healthy resting level.",
    progressPercent: 100,
    achieved: true,
    icon: "Heart"
  },
  {
    id: "m-72h",
    timeframe: "72 Hours Clean",
    title: "Peak Physical Detox Passed",
    description: "Acute chemical substances cleared from bloodstream; bronchial tubes begin relaxing.",
    progressPercent: 100,
    achieved: true,
    icon: "Wind"
  },
  {
    id: "m-2w",
    timeframe: "2 Weeks Clean",
    title: "Dopamine D2 Receptor Upregulation",
    description: "Brain neural reward pathways begin self-repairing; natural motivation increases.",
    progressPercent: 100,
    achieved: true,
    icon: "Brain"
  },
  {
    id: "m-1m",
    timeframe: "1 Month Clean",
    title: "Liver Enzyme & Sleep Stabilization",
    description: "Liver inflammation decreases; REM deep sleep cycles fully restore.",
    progressPercent: 100,
    achieved: true,
    icon: "Moon"
  },
  {
    id: "m-90d",
    timeframe: "90 Days Clean",
    title: "Prefrontal Cortex Restoration",
    description: "Executive impulse control circuits fully strengthen, reducing craving relapse risk by 85%.",
    progressPercent: 41,
    achieved: false,
    icon: "ShieldCheck"
  },
  {
    id: "m-1y",
    timeframe: "1 Year Clean",
    title: "Total Cardiovascular & Brain Reset",
    description: "Coronary heart disease risk halved; dopamine receptor density fully restored.",
    progressPercent: 10,
    achieved: false,
    icon: "Sparkles"
  }
];

export const INITIAL_CRAVING_LOGS = [
  { id: "c-1", date: "Jul 21", time: "08:30 PM", intensity: 7, trigger: "Social Event", location: "Restaurant", copingAction: "Guided Box Breathing & Called Sister" },
  { id: "c-2", date: "Jul 22", time: "06:15 PM", intensity: 4, trigger: "Work Stress", location: "Office", copingAction: "Listened to Huberman Podcast" },
  { id: "c-3", date: "Jul 23", time: "09:00 PM", intensity: 3, trigger: "Boredom", location: "Home", copingAction: "Logged Journal & AI CBT Reframing" },
  { id: "c-4", date: "Jul 24", time: "07:45 PM", intensity: 8, trigger: "Emotional Distress", location: "Home", copingAction: "Triggered Emergency WebRTC Video & AI Task Checklist" },
  { id: "c-5", date: "Jul 25", time: "11:20 AM", intensity: 2, trigger: "Mild Fatigue", location: "Park", copingAction: "5-4-3-2-1 Grounding Method" }
];

export const INITIAL_MEETING_LOGS = [
  { id: "m-1", date: "Jul 24, 2026", type: "Alcoholics Anonymous (AA)", topic: "Step 1: Acceptance & Surrender", location: "Community Center / Zoom", notes: "Shared my 36 day milestone and felt huge support from sponsors." },
  { id: "m-2", date: "Jul 22, 2026", type: "SMART Recovery", topic: "Managing Cravings & Urge Surfing", location: "Online SMART Portal", notes: "Learned the ABCD rational coping model for sudden trigger waves." },
  { id: "m-3", date: "Jul 18, 2026", type: "Narcotics Anonymous (NA)", topic: "Living One Day at a Time", location: "St. Mark Fellowship Hall", notes: "Received my 30-day sobriety keytag." }
];

export const AMBIENT_SOUNDSCAPES = [
  { id: "rain", name: "Calming Gentle Rain", freq: 432, desc: "Alpha wave frequency for anxiety & craving reduction", icon: "CloudRain" },
  { id: "ocean", name: "Deep Ocean Waves", freq: 528, desc: "Solffeggio healing tone for nerve soothing", icon: "Waves" },
  { id: "forest", name: "Night Forest Ambience", freq: 216, desc: "Theta wave frequency for deep sleep & relaxation", icon: "Trees" },
  { id: "brown", name: "Brown Noise Grounding", freq: 100, desc: "Low frequency noise to quiet racing thoughts & panic", icon: "Volume2" }
];

export const HEALTH_YOUTUBE_VIDEOS = [
  {
    id: "yt-1",
    title: "Dopamine Nation: Finding Balance in Recovery",
    speaker: "Dr. Anna Lembke (Stanford Psychiatry)",
    duration: "14:20",
    youtubeId: "p3JLaF_4Tz8",
    youtubeUrl: "https://www.youtube.com/watch?v=p3JLaF_4Tz8",
    category: "Neuroscience",
    thumbnail: "https://img.youtube.com/vi/p3JLaF_4Tz8/hqdefault.jpg",
    description: "Stanford Psychiatrist Dr. Anna Lembke explains how dopamine pleasure-pain balance works and how to reset your brain chemistry in addiction recovery."
  },
  {
    id: "yt-2",
    title: "Understanding & Overcoming Cravings",
    speaker: "Huberman Lab Podcast",
    duration: "18:45",
    youtubeId: "gXVU9wDGy6E",
    youtubeUrl: "https://www.youtube.com/watch?v=gXVU9wDGy6E",
    category: "Brain Health",
    thumbnail: "https://img.youtube.com/vi/gXVU9wDGy6E/hqdefault.jpg",
    description: "Neuroscience tools to control impulse loops, manage acute stress waves, and build long-term neural resilience."
  },
  {
    id: "yt-3",
    title: "5-4-3-2-1 Grounding Method for Relapse Prevention",
    speaker: "Therapy in a Nutshell",
    duration: "08:15",
    youtubeId: "30VMIEmA114",
    youtubeUrl: "https://www.youtube.com/watch?v=30VMIEmA114",
    category: "Coping Technique",
    thumbnail: "https://img.youtube.com/vi/30VMIEmA114/hqdefault.jpg",
    description: "Learn how to use sensory awareness to snap out of panic, extreme anxiety, and sudden addiction cravings in under 3 minutes."
  }
];

export const DAILY_MOTIVATION_QUOTES = [
  { quote: "Every day clean is a victory over your past self.", author: "Dr. Anna Lembke" },
  { quote: "Recovery is not a sprint; it's rebuilding your brain neural pathways one day at a time.", author: "Dr. Andrew Huberman" },
  { quote: "Your streak is proof that you possess infinite inner resilience.", author: "SAMHSA Clinical Guide" },
  { quote: "Small daily habits compound into complete lifelong freedom.", author: "RecoverAI Coach" }
];

export const INITIAL_MOOD_HISTORY = [
  { day: "Mon", mood: "Calm", val: 4, date: "Jul 19" },
  { day: "Tue", mood: "Happy", val: 5, date: "Jul 20" },
  { day: "Wed", mood: "Anxiety", val: 2, date: "Jul 21" },
  { day: "Thu", mood: "Neutral", val: 3, date: "Jul 22" },
  { day: "Fri", mood: "Happy", val: 5, date: "Jul 23" },
  { day: "Sat", mood: "Sad", val: 2, date: "Jul 24" },
  { day: "Sun (Today)", mood: "Calm", val: 4, date: "Jul 25" }
];

export const INITIAL_RISK_TREND = [
  { day: "Jul 19", riskScore: 1, level: "Low" },
  { day: "Jul 20", riskScore: 1, level: "Low" },
  { day: "Jul 21", riskScore: 2, level: "Medium" },
  { day: "Jul 22", riskScore: 1, level: "Low" },
  { day: "Jul 23", riskScore: 1, level: "Low" },
  { day: "Jul 24", riskScore: 3, level: "High" },
  { day: "Jul 25", riskScore: 1, level: "Low" }
];

export const INITIAL_JOURNAL_ENTRIES = [
  {
    id: "j-1",
    date: "July 24, 2026",
    time: "09:30 PM",
    mood: "😢 Sad",
    text: "Felt a strong urge after a stressful work meeting. I used the 30-second breathing exercise and called my sister. Glad I stayed strong.",
    trigger: "Work Stress",
    cbtInsight: "Recognizing that work stress is a transient trigger rather than an insurmountable hurdle shows strong cognitive reframing."
  },
  {
    id: "j-2",
    date: "July 25, 2026",
    time: "08:15 AM",
    mood: "😊 Calm",
    text: "I'm feeling better today. Reached 37 days of recovery! Going for a morning walk now.",
    trigger: "None",
    cbtInsight: "Celebrating small daily milestones reinforces positive neural reward pathways."
  }
];

export const RECOVERY_RESOURCES = [
  {
    id: "res-1",
    title: "Understanding Addiction & Brain Chemistry",
    category: "Education",
    readTime: "4 min read",
    icon: "Brain",
    summary: "Learn how dopamine pathways reset during recovery and why cravings peak in wave patterns.",
    content: `Addiction alters the brain's reward system, specifically the neurotransmitter dopamine. During recovery, your brain is actively rewiring itself (neuroplasticity). Cravings usually peak within 10 to 15 minutes and then decline like a wave. Understanding that a craving is temporary is the key to riding it out safely.`
  },
  {
    id: "res-2",
    title: "5-4-3-2-1 Grounding Technique",
    category: "Coping Technique",
    readTime: "3 min read",
    icon: "ShieldAlert",
    summary: "A portion of sensory technique to snap out of panic, anxiety, or intense sudden triggers.",
    content: `When feeling overwhelmed:
1. Look around and name 5 things you can SEE.
2. Touch 4 things around you (your clothes, chair, desk).
3. Listen for 3 distinct SOUNDS.
4. Identify 2 things you can SMELL.
5. Focus on 1 thing you can TASTE or say 1 positive truth out loud.`
  },
  {
    id: "res-3",
    title: "Guided Box Breathing Method",
    category: "Meditation",
    readTime: "Interactive",
    icon: "Wind",
    summary: "Standard military & clinical technique to reduce high heart rate and lower cortisol levels.",
    content: `Box Breathing (4x4):
- Inhale deeply for 4 seconds
- Hold your breath for 4 seconds
- Exhale slowly for 4 seconds
- Hold empty for 4 seconds
Repeat this cycle for 30 to 60 seconds during high trigger moments.`
  }
];
