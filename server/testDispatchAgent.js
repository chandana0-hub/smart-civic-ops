import { planIncidentDispatch } from './services/dispatchAgent.js';

async function runTest() {
  console.log("⚡ Starting Autonomous Dispatch & Action Planning Agent Test...\n");

  const mockIncident = {
    id: "INC-8821",
    title: "Burst water main flooding residential street",
    description: "Water pipe cracked near intersection, water filling street and affecting traffic.",
    category: "Water",
    priority: "Critical",
    department: "Bangalore Water Supply & Sewerage Board (BWSSB)",
    location: "4th Cross, Indiranagar",
    reportCount: 3
  };

  console.log("📡 Sending high-priority incident to Dispatch Agent...");
  const response = await planIncidentDispatch(mockIncident);

  console.log("\n====================================");
  console.log(`Engine Used: ${response.engine}`);
  console.log("Generated Dispatch Plan:");
  console.log(JSON.stringify(response.plan, null, 2));
  console.log("====================================\n");
}

runTest();