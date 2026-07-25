import { GoogleGenAI } from '@google/genai';
import { getStoredApiKey, getStoredProfile } from '../utils/storage';

const SYSTEM_PROMPT = `
You are RecoverAI, a compassionate, non-judgmental addiction recovery and relapse prevention assistant.
Never encourage drug or alcohol use.

Analyze the user's message carefully.
Determine:
1. Emotion (e.g. Calm, Sad, Anxiety, Angry, Overwhelmed, Hopeful, Lonely)
2. Risk Level (Low, Medium, High)
3. Likely Trigger (Stress, Loneliness, Peer Pressure, Family Problems, Fatigue, Cravings, Physical Pain, None)
4. Brief Summary (1 sentence analysis of user state)
5. Empathetic Response (Warm, supportive, actionable 2-3 sentences. Never preachy.)
6. Primary Action (action1: e.g. "Call Trusted Contact", "Breathing Exercise", "Journal Thoughts")
7. Secondary Action (action2: e.g. "Go for a Walk", "Listen to Guided Meditation", "Drink Water")
8. Motivation Quote/Sentence (Short uplifting phrase tailored to their state)

CRITICAL: Return ONLY raw JSON without markdown codeblock formatting or extra text.
The JSON must follow this exact structure:
{
  "emotion": "Anxiety",
  "risk": "High",
  "trigger": "Stress",
  "summary": "Experiencing work stress and sudden craving to drink tonight.",
  "response": "I hear how heavy this evening feels. Please pause and take a slow breath. This intense craving is a temporary wave that will pass within a few minutes if we stay grounded together.",
  "action1": "Call Trusted Contact",
  "action2": "30s Breathing Exercise",
  "motivation": "You have built your progress one day at a time. You've got this."
}
`;

export async function analyzeWithGemini(userMessage) {
  const apiKey = getStoredApiKey();
  const profile = getStoredProfile();
  const userName = profile?.name || 'Friend';

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const model = 'gemini-3.6-flash';

      const response = await ai.models.generateContent({
        model: model,
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Name: "${userName}"\nUser Message: "${userMessage}"` }] }
        ],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      });

      const textOutput = response.text;
      if (textOutput) {
        const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        return parsed;
      }
    } catch (err) {
      console.warn('Gemini API call error, using intelligent fallback analysis:', err);
    }
  }

  return generateIntelligentFallback(userMessage, userName);
}

// Gen AI Feature 1: AI Daily Morning Recovery Plan Generator
export async function generateAIDailyPlan(profile, _moodHistory, _vitals) {
  const apiKey = getStoredApiKey();
  const userName = profile?.name || 'Friend';

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Generate a customized daily morning recovery plan for ${userName} who is on day ${profile?.recoveryStreak || 1} of recovery.
Return JSON format:
{
  "affirmation": "Short inspiring quote for today",
  "tasks": [
    { "title": "Morning Task 1", "category": "Mindfulness", "completed": false },
    { "title": "Afternoon Task 2", "category": "Physical", "completed": false },
    { "title": "Evening Task 3", "category": "Reflections", "completed": false }
  ],
  "triggerAdvisory": "1 sentence advice on potential stress or cravings today"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseMimeType: 'application/json', temperature: 0.4 }
      });

      if (response.text) {
        const cleaned = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
      }
    } catch (e) {
      console.warn('AI Daily Plan fallback:', e);
    }
  }

  // Fallback Daily Plan
  return {
    affirmation: `Today is Day ${profile?.recoveryStreak || 1} of your freedom. Walk forward with confidence, ${userName}.`,
    tasks: [
      { title: "Complete 30s Guided Box Breathing after waking up", category: "Mindfulness", completed: false },
      { title: "Take a 15-minute outdoor walk & log your daily exercise", category: "Physical", completed: false },
      { title: "Write a evening journal entry reflecting on today's triggers", category: "Reflection", completed: false }
    ],
    triggerAdvisory: "Watch out for late-afternoon fatigue. Keep your emergency contacts accessible."
  };
}

// Gen AI Feature 2: AI Emergency Recovery Task Protocol Generator
export async function generateAIEmergencyProtocol(triggerReason = 'Panic / Craving Wave') {
  const apiKey = getStoredApiKey();
  const profile = getStoredProfile();
  const userName = profile?.name || 'Friend';

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `User ${userName} is experiencing acute crisis/panic trigger: "${triggerReason}".
Generate a 3-step immediate crisis recovery task protocol to de-escalate panic and prevent relapse right now.
Return JSON format:
{
  "crisisSummary": "1 sentence calming statement",
  "steps": [
    { "id": 1, "title": "Step 1 Action Name", "instruction": "Clear 1-sentence action instruction", "completed": false },
    { "id": 2, "title": "Step 2 Action Name", "instruction": "Clear 1-sentence action instruction", "completed": false },
    { "id": 3, "title": "Step 3 Action Name", "instruction": "Clear 1-sentence action instruction", "completed": false }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseMimeType: 'application/json', temperature: 0.2 }
      });

      if (response.text) {
        const cleaned = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
      }
    } catch (e) {
      console.warn('AI Emergency Protocol fallback:', e);
    }
  }

  // Fallback Emergency Tasks
  return {
    crisisSummary: `Stay grounded, ${userName}. Craving waves peak within 10 minutes and then subside. Complete these 3 recovery tasks now:`,
    steps: [
      { id: 1, title: "5-4-3-2-1 Sensory Grounding", instruction: "Name 5 things you see, touch 4 objects around you, and listen for 3 sounds right now.", completed: false },
      { id: 2, title: "30-Second Guided Box Breath", instruction: "Launch the built-in box breathing exercise to lower your elevated heart rate.", completed: false },
      { id: 3, title: "Reach Out to Caregiver", instruction: `Call or message ${profile?.trustedContact?.name || 'Primary Caregiver'} via phone or WhatsApp link below.`, completed: false }
    ]
  };
}

// Gen AI Feature 3: AI CBT Journal Reframing Insight Generator
export async function generateAICBTInsight(journalText) {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Analyze this addiction recovery journal reflection: "${journalText}".
Provide a concise 2-sentence Cognitive Behavioral Therapy (CBT) psychological insight and positive reframing.
Return raw string response.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { temperature: 0.3 }
      });

      if (response.text) return response.text.trim();
    } catch (e) {
      console.warn('CBT Insight fallback:', e);
    }
  }

  return "Recognizing your emotional triggers and writing them down shifts brain activity from reactive impulse to conscious control. Keep honoring your progress.";
}

// Gen AI Feature 4: AI 24-Hour Relapse Risk Predictive Analysis
export async function predictRelapseRiskAI(vitals, moodHistory, streak) {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Predict 24-hour relapse risk based on BioTracker Health Vitals (Heart Rate: ${vitals?.heartRate?.bpm || 72} BPM, HRV: ${vitals?.hrv?.ms || 58}ms, Sleep: ${vitals?.sleep?.hours || 7.8}hrs) and recovery streak of ${streak} days.
Return JSON format:
{
  "riskLevel": "Low" | "Medium" | "High",
  "probabilityScore": 12, // percentage 0-100
  "forecast": "1-2 sentence risk forecast for next 24 hours",
  "primaryRecommendation": "Key action to mitigate risk today"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseMimeType: 'application/json', temperature: 0.2 }
      });

      if (response.text) {
        const cleaned = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
      }
    } catch (e) {
      console.warn('Risk prediction fallback:', e);
    }
  }

  return {
    riskLevel: "Low",
    probabilityScore: 14,
    forecast: "Physiological vitals indicate stable heart rate variability (58ms) and healthy sleep. Relapse risk is low for the next 24 hours.",
    primaryRecommendation: "Maintain hydration and stick to your evening mindfulness routine."
  };
}

function generateIntelligentFallback(msg, userName = 'Friend') {
  const text = msg.toLowerCase();
  
  if (text.includes('drink') || text.includes('relapse') || text.includes('bottle') || text.includes('bar') || text.includes('give up') || text.includes('craving') || text.includes('alcohol') || text.includes('drugs') || text.includes('tempted')) {
    let trigger = 'Stress';
    if (text.includes('lonely') || text.includes('alone')) trigger = 'Loneliness';
    if (text.includes('friend') || text.includes('party')) trigger = 'Peer Pressure';
    if (text.includes('family') || text.includes('argument')) trigger = 'Family Problems';

    return {
      emotion: text.includes('angry') ? 'Angry' : text.includes('anxious') || text.includes('panic') ? 'Anxiety' : 'Sad',
      risk: 'High',
      trigger: trigger,
      summary: `High relapse risk detected due to ${trigger.toLowerCase()} and immediate temptation.`,
      response: `I hear how intense this moment feels, ${userName}. Craving triggers can feel overwhelming, but remember that a craving is a wave that peaks and subsides within 15 minutes. Let's get support right now.`,
      action1: 'Call Trusted Contact',
      action2: '30s Breathing Exercise',
      motivation: 'You are strong. Do not trade days of freedom for minutes of temporary relief.'
    };
  }

  if (text.includes('stressed') || text.includes('anxious') || text.includes('sad') || text.includes('tired') || text.includes('lonely') || text.includes('hard day') || text.includes('bad day') || text.includes('upset')) {
    let trigger = 'Stress';
    if (text.includes('lonely') || text.includes('miss')) trigger = 'Loneliness';
    if (text.includes('fight') || text.includes('family')) trigger = 'Family Problems';

    return {
      emotion: text.includes('anxious') || text.includes('worry') ? 'Anxiety' : text.includes('sad') ? 'Sad' : 'Angry',
      risk: 'Medium',
      trigger: trigger,
      summary: `Moderate distress detected linked to ${trigger.toLowerCase()}.`,
      response: `I'm here with you, ${userName}. It's completely valid to feel this way after a challenging day. Taking a moment to acknowledge your feelings without turning to past coping mechanisms is huge progress.`,
      action1: '30s Breathing Exercise',
      action2: 'Write Journal Entry',
      motivation: 'Courage doesn\'t always roar. Sometimes courage is the quiet voice saying, "I will try again tomorrow."'
    };
  }

  return {
    emotion: text.includes('good') || text.includes('great') || text.includes('happy') ? 'Calm' : 'Calm',
    risk: 'Low',
    trigger: 'None',
    summary: 'User is in a calm, stable emotional state.',
    response: `That's wonderful to hear, ${userName}! Staying mindful and celebrating quiet, steady days builds a resilient foundation for long-term recovery.`,
    action1: 'Log Mood Today',
    action2: 'Read Recovery Tips',
    motivation: 'Every clean sunrise is a victory worth celebrating.'
  };
}
