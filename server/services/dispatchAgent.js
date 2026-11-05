import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

/**
 * Autonomous Municipal Dispatch & Action Planning Agent
 * Analyzes incident severity and department to generate crew assignments,
 * ETAs, equipment checklists, and citizen status notifications.
 */
export async function planIncidentDispatch(incident) {
  const {
    id = "INC-" + Math.floor(1000 + Math.random() * 9000),
    title = "Civic Incident",
    description = "",
    category = "General",
    priority = "Medium",
    department = "Municipal Operations",
    location = "City Center",
    reportCount = 1
  } = incident;

  // 1. Try Gemini AI Dispatch Generation
  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `
You are the Autonomous Municipal Dispatch and Operations Agent for Smart Civic Operations.
An incident has been triaged and verified:
- Incident ID: ${id}
- Title: ${title}
- Description: ${description}
- Category: ${category}
- Priority: ${priority}
- Department: ${department}
- Location: ${location}
- Number of Citizen Reports: ${reportCount}

Generate a structured operational dispatch plan as strict JSON:
{
  "incidentId": "${id}",
  "assignedUnit": "Specific municipal unit name (e.g. PWD Rapid Asphalt Crew #3, BWSSB Water Pipe Emergency Unit)",
  "dispatchPriority": "Immediate" | "Urgent" | "Standard" | "Scheduled",
  "estimatedResolutionHours": number (e.g. 2, 6, 24, 48),
  "equipmentRequired": ["List of 2-4 key tools/vehicles needed"],
  "actionSteps": [
    "Step 1: On-site hazard containment",
    "Step 2: Technical repair",
    "Step 3: Quality verification & citizen notification"
  ],
  "citizenNotification": "Clear, reassuring SMS/app notification text explaining the action being taken",
  "confidenceScore": 0.95
}
Return ONLY valid raw JSON with no Markdown backticks, no markdown fencing, and no other text.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const plan = JSON.parse(cleaned);
      return { success: true, engine: 'gemini-ai', plan };
    } catch (err) {
      console.warn("⚠️ Gemini API dispatch generation failed. Engaging deterministic dispatch engine:", err.message);
    }
  }

  // 2. Deterministic Fallback Dispatch Engine
  const etaMap = {
    Critical: 3,
    High: 8,
    Medium: 24,
    Low: 72
  };

  const unitMap = {
    Roads: "PWD Urban Road Maintenance Unit #4",
    Water: "City Water & Sewerage Emergency Response Crew #2",
    Electricity: "Municipal Power Grid Rapid Restoration Team #1",
    Sanitation: "Solid Waste Management Rapid Clearance Truck #7",
    "Public Safety": "Civic Hazard Prevention & Traffic Control Squad"
  };

  const assignedUnit = unitMap[category] || `${department} Field Operations Unit #1`;
  const hours = etaMap[priority] || 24;

  const fallbackPlan = {
    incidentId: id,
    assignedUnit,
    dispatchPriority: priority === 'Critical' ? 'Immediate' : (priority === 'High' ? 'Urgent' : 'Standard'),
    estimatedResolutionHours: hours,
    equipmentRequired: [
      "Safety cones and high-visibility perimeter tape",
      "Department inspection kit and diagnostic tablets",
      "Heavy duty repair vehicle and standard field toolkit"
    ],
    actionSteps: [
      `Dispatch ${assignedUnit} to ${location}.`,
      "Establish safe perimeter and assess structural damage.",
      "Execute repair according to standard municipal civic maintenance code.",
      "Capture resolution photo and verify system restoration."
    ],
    citizenNotification: `Your report regarding '${title}' at ${location} has been dispatched to ${assignedUnit}. Estimated resolution time is ${hours} hours. Thank you for helping keep our city safe!`,
    confidenceScore: 0.88
  };

  return { success: true, engine: 'deterministic-fallback', plan: fallbackPlan };
}
