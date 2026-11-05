import { triageCivicReport } from './services/triageAgent.js';

async function runTest() {
  console.log("⚡ Starting Autonomous Civic Triage Agent Test...\n");

  const mockReport = {
    title: "Burst water main flooding intersection near electrical junction box",
    description: "High pressure water pipe ruptured on 10th Main Road. Massive water logging, reaching open transformer/power box. Traffic blocked.",
    location: "Corner of 10th Main & 4th Cross",
    mediaUrl: null
  };

  try {
    console.log("📡 Sending mock complaint to Gemini AI Agent...");
    const result = await triageCivicReport(mockReport);

    console.log("\n==========================================");
    console.log("🤖 AUTONOMOUS AGENT TRIAGE DECISION:");
    console.log("==========================================");
    console.log(JSON.stringify(result, null, 2));
    console.log("==========================================\n");
  } catch (err) {
    console.error("❌ Test crashed:", err);
  }
}

runTest();