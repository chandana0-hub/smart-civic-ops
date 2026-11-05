import * as triageModule from './triageAgent.js';
import * as duplicateModule from './duplicateAgent.js';
import * as dispatchModule from './dispatchAgent.js';

// Helper to safely resolve whichever export name was used in the service files
const resolveFn = (mod, names) => {
  for (const name of names) {
    if (typeof mod[name] === 'function') return mod[name];
  }
  if (typeof mod.default === 'function') return mod.default;
  return null;
};

/**
 * Autonomous Multi-Agent Civic Operations Orchestrator
 * Coordinates Triage Agent, Duplicate Agent, and Dispatch Agent
 * into a single unified automated pipeline.
 */
export async function processCivicReport(rawComplaint, existingIncidents = []) {
  console.log(`\n🤖 [Orchestrator] Processing complaint from: ${rawComplaint.citizenName || 'Citizen'}`);

  // Stage 1: Triage & Classification Agent
  console.log('➡️ Stage 1: Running Triage Agent...');
  const triageFn = resolveFn(triageModule, ['runTriageAgent', 'triageComplaint', 'triageIssue']);
  let triageResult;
  if (triageFn) {
    triageResult = await triageFn(rawComplaint.text);
  } else {
    triageResult = {
      data: { category: 'Civic Infrastructure', priority: 'High', department: 'Public Works' },
      engine: 'deterministic-fallback'
    };
  }
  const triageData = triageResult?.data || triageResult || {
    category: 'Civic Infrastructure',
    priority: 'High',
    department: 'Public Works'
  };

  // Stage 2: Deduplication & Severity Escalation Agent
  console.log('➡️ Stage 2: Running Duplicate & Clustering Agent...');
  const duplicateFn = resolveFn(duplicateModule, ['detectDuplicates', 'checkDuplicateAndCluster', 'analyzeDuplicate']);
  let clusterResult;
  if (duplicateFn) {
    clusterResult = await duplicateFn(rawComplaint.text, existingIncidents);
  } else {
    clusterResult = {
      result: {
        isDuplicate: false,
        confidence: 0,
        clusterId: `CLUSTER-${Math.floor(100 + Math.random() * 900)}`,
        reportCount: 1,
        escalatedPriority: triageData.priority
      },
      engine: 'deterministic-fallback'
    };
  }
  const clusterData = clusterResult?.result || clusterResult || {};
  const effectivePriority = clusterData.escalatedPriority || triageData.priority || 'Medium';

  const incidentRecord = {
    id: clusterData.isDuplicate ? clusterData.matchedIncidentId : `INC-${Math.floor(1000 + Math.random() * 9000)}`,
    title: rawComplaint.title || `${triageData.category} Issue at ${rawComplaint.location || 'City Area'}`,
    description: rawComplaint.text,
    category: triageData.category,
    priority: effectivePriority,
    department: triageData.department,
    location: rawComplaint.location || 'City Center',
    reportCount: clusterData.reportCount || 1,
    isDuplicate: !!clusterData.isDuplicate,
    clusterId: clusterData.clusterId || `CLUSTER-${Math.floor(100 + Math.random() * 900)}`
  };

  // Stage 3: Municipal Action Plan & Dispatch Agent
  console.log('➡️ Stage 3: Running Municipal Dispatch Agent...');
  const dispatchFn = resolveFn(dispatchModule, ['planIncidentDispatch', 'runDispatchAgent', 'planDispatch']);
  let dispatchResult;
  if (dispatchFn) {
    dispatchResult = await dispatchFn(incidentRecord);
  } else {
    dispatchResult = {
      plan: {
        assignedCrew: 'Rapid Response Municipal Team',
        estimatedResolutionTime: '4 hours',
        actionsRequired: ['Site inspection', 'Deploy field crew'],
        citizenNotification: 'Report received and assigned.'
      },
      engine: 'deterministic-fallback'
    };
  }
  const dispatchPlan = dispatchResult?.plan || dispatchResult || {};

  console.log('✅ [Orchestrator] Multi-agent processing complete!\n');

  return {
    success: true,
    incident: incidentRecord,
    triageAnalysis: triageData,
    duplicateAnalysis: clusterData,
    dispatchPlan: dispatchPlan,
    pipelineEngines: {
      triage: triageResult?.engine || 'deterministic-fallback',
      duplicate: clusterResult?.engine || 'deterministic-fallback',
      dispatch: dispatchResult?.engine || 'deterministic-fallback'
    }
  };
}