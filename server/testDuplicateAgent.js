import { detectDuplicates } from './services/duplicateAgent.js';

async function runTest() {
  console.log('⚡ Starting Autonomous Duplicate Detection Agent Test...\n');

  // Existing complaints already in the city database
  const existingComplaints = [
    {
      id: 'CMP-101',
      title: 'Water pipe leak on 5th Cross Road',
      description: 'Water is gushing out from the underground pipe near the park.',
      category: 'Water & Sanitation',
      location: '5th Cross Road, Indiranagar',
      severity: 'Medium',
      clusterId: 'cluster-101',
      reportCount: 1
    },
    {
      id: 'CMP-102',
      title: 'Fallen street tree',
      description: 'Big branch blocking sidewalk.',
      category: 'Parks & Recreation',
      location: '12th Main Road',
      severity: 'Low',
      clusterId: 'cluster-102',
      reportCount: 1
    }
  ];

  // Case 1: A duplicate report for the same water leak from a second citizen
  const incomingReport1 = {
    id: 'CMP-103',
    title: 'Severe pipeline burst Indiranagar',
    description: 'Road is flooding near the park on 5th cross, water pressure very high!',
    category: 'Water & Sanitation',
    location: '5th Cross Road, Indiranagar',
    severity: 'Medium'
  };

  console.log('📡 Case 1: Sending duplicate complaint (Water leak at 5th Cross)...');
  const result1 = await detectDuplicates(incomingReport1, existingComplaints);
  console.log('Result 1:');
  console.log(JSON.stringify(result1, null, 2));
  console.log('\n====================================\n');

  // Case 2: A totally new, unique report
  const incomingReport2 = {
    id: 'CMP-104',
    title: 'Streetlight not turning on',
    description: 'Dark alleyway near bus stop, lights off for 3 days.',
    category: 'Electrical & Lighting',
    location: '24th Avenue, Koramangala',
    severity: 'Low'
  };

  console.log('📡 Case 2: Sending unique complaint (Streetlight in Koramangala)...');
  const result2 = await detectDuplicates(incomingReport2, existingComplaints);
  console.log('Result 2:');
  console.log(JSON.stringify(result2, null, 2));
}

runTest();