import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) 
  : null;

/**
 * Duplicate & Clustering Agent
 * Compares a newly submitted complaint against existing open complaints.
 * Detects if it's a duplicate or related incident and adjusts severity accordingly.
 *
 * @param {Object} newComplaint - { id, title, description, category, location }
 * @param {Array} existingComplaints - List of current open complaints
 * @returns {Promise<Object>}
 */
export async function detectDuplicates(newComplaint, existingComplaints = []) {
  if (!existingComplaints || existingComplaints.length === 0) {
    return {
      isDuplicate: false,
      clusterId: `cluster-${newComplaint.id || Date.now()}`,
      matchedComplaintId: null,
      confidenceScore: 0.0,
      escalatedSeverity: newComplaint.severity || 'Medium',
      reportCount: 1,
      reasoning: 'No existing active complaints to match against. Initiated new cluster.'
    };
  }

  // 1. Try AI-powered semantic matching if Gemini API Key is available
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `
You are an Autonomous Civic Incident Clustering Agent for smart city operations.
Analyze this NEW citizen complaint against the list of EXISTING active complaints to determine if it describes the same real-world incident or hazard.

NEW COMPLAINT:
${JSON.stringify(newComplaint, null, 2)}

EXISTING COMPLAINTS:
${JSON.stringify(existingComplaints.map(c => ({
  id: c.id,
  title: c.title,
  description: c.description,
  category: c.category,
  location: c.location,
  severity: c.severity,
  clusterId: c.clusterId
})), null, 2)}

Return ONLY a strict JSON object with this structure:
{
  "isDuplicate": true | false,
  "matchedComplaintId": "id of matched complaint or null",
  "confidenceScore": 0.0 to 1.0,
  "clusterId": "existing clusterId if matched, or generate new one like cluster-<timestamp>",
  "escalatedSeverity": "Low" | "Medium" | "High" | "Critical",
  "reportCount": number,
  "reasoning": "brief explanation of why this matches or does not match"
}

Rule: If 2 or more reports match the same hazard in close proximity, escalate severity (e.g. Medium -> High, High -> Critical).
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn('⚠️ Gemini clustering failed, falling back to rule-based engine:', err.message);
    }
  }

  // 2. Deterministic Fallback Rule Engine (runs offline or without API key)
  const normNewLoc = (newComplaint.location || '').toLowerCase();
  const normNewTitle = (newComplaint.title || '').toLowerCase();

  const match = existingComplaints.find(c => {
    const locMatch = normNewLoc && (c.location || '').toLowerCase().includes(normNewLoc);
    const catMatch = c.category && newComplaint.category && c.category === newComplaint.category;
    const titleMatch = normNewTitle && (c.title || '').toLowerCase().includes(normNewTitle.split(' ')[0]);
    return (locMatch && catMatch) || (locMatch && titleMatch);
  });

  if (match) {
    const prevReports = match.reportCount || 1;
    const newCount = prevReports + 1;
    let newSeverity = match.severity || 'Medium';

    if (newCount >= 3) newSeverity = 'Critical';
    else if (newCount >= 2) newSeverity = 'High';

    return {
      isDuplicate: true,
      clusterId: match.clusterId || `cluster-${match.id}`,
      matchedComplaintId: match.id,
      confidenceScore: 0.88,
      escalatedSeverity: newSeverity,
      reportCount: newCount,
      reasoning: `Rule Match: Matching category/location with complaint #${match.id}. Multi-citizen reports escalated severity to ${newSeverity}.`
    };
  }

  return {
    isDuplicate: false,
    clusterId: `cluster-${newComplaint.id || Date.now()}`,
    matchedComplaintId: null,
    confidenceScore: 0.1,
    escalatedSeverity: newComplaint.severity || 'Medium',
    reportCount: 1,
    reasoning: 'No matching location/category found in active incidents. Registered as standalone report.'
  };
}

