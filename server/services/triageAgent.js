import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Autonomous Civic Triage & Routing Agent (Dev 2)
 */
export async function triageCivicReport({ title, description, location, mediaUrl }) {
  const prompt = `
You are the Autonomous Civic Triage Engine for a Smart City Operations platform.
Analyze this citizen report and output deterministic operational data.

CITIZEN REPORT:
- Title: "${title}"
- Description: "${description}"
- Location: "${location || 'Unspecified'}"
- Media Attached: ${mediaUrl ? 'Yes' : 'No'}

TASK:
Return ONLY a valid JSON object matching this schema:
{
  "department": "One of: ['Water & Sanitation', 'Roads & Traffic', 'Electricity & Power', 'Waste Management', 'Public Safety', 'Parks & Recreation']",
  "priority": "One of: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']",
  "confidenceScore": 0.95,
  "safetyHazards": ["list of immediate risks"],
  "estimatedResolutionHours": 4,
  "autonomousAction": {
    "actionType": "One of: ['DISPATCH_EMERGENCY_CREW', 'SCHEDULE_MAINTENANCE', 'NOTIFY_UTILITY_BOARD', 'FLAG_FOR_INSPECTION']",
    "assignedUnit": "e.g., Rapid Repair Squad Alpha",
    "workOrderSummary": "Clear 1-sentence technical instruction for the field worker"
  },
  "citizenResponse": "A professional, empathetic 1-2 sentence response to the citizen"
}
`;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const response = await model.generateContent(prompt);

    return {
      success: true,
      agentId: "agent-triage-v1",
      timestamp: new Date().toISOString(),
      decision: JSON.parse(response.response.text())
    };
  } catch (error) {
    console.error("AI Triage Error:", error);
    return {
      success: false,
      error: error.message,
      decision: {
        department: "General Civic Support",
        priority: "MEDIUM",
        confidenceScore: 0.5,
        safetyHazards: ["Requires manual review"],
        estimatedResolutionHours: 24,
        autonomousAction: {
          actionType: "FLAG_FOR_INSPECTION",
          assignedUnit: "Duty Officer",
          workOrderSummary: "Manual triage required"
        },
        citizenResponse: "Your report has been queued for departmental assessment."
      }
    };
  }
}