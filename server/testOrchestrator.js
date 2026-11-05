import { processCivicReport } from './services/orchestrator.js';

async function runTest() {
  console.log('⚡ Starting Master Civic Operations Pipeline Test...\n');

  // Test Case 1: Fresh citizen report with a related existing incident
  const mockComplaint = {
    citizenName: 'Karan Sharma',
    text: 'Severe water main burst on 5th Avenue causing immediate road flooding and traffic congestion.',
    location: '5th Avenue & Elm St'
  };

  const existingIncidents = [
    {
      id: 'INC-1001',
      title: 'Water pipe leak on 5th Avenue',
      description: 'Minor water leakage reported near 5th Avenue sidewalk',
      category: 'Water & Sewage',
      priority: 'Medium',
      reportCount: 1
    }
  ];

  try {
    const result = await processCivicReport(mockComplaint, existingIncidents);
    console.log('====================================');
    console.log('🎯 Orchestrator Pipeline Result:');
    console.log(JSON.stringify(result, null, 2));
    console.log('====================================');
  } catch (err) {
    console.error('❌ Pipeline Error:', err);
  }
}

runTest();