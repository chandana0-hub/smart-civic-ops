// server/routes/aiRoutes.js
import express from 'express';
import { processCivicReport } from '../services/orchestrator.js';
import { incidents, addIncident, getAllIncidents } from '../data/incidents.js';

const router = express.Router();

// GET /api/incidents - List all incidents for the frontend dashboard
router.get('/incidents', (req, res) => {
  res.status(200).json({
    success: true,
    count: incidents.length,
    data: getAllIncidents()
  });
});

// POST /api/complaints - Submit citizen complaint and run autonomous AI pipeline
router.post('/complaints', async (req, res) => {
  try {
    const { citizenText, location, citizenContact } = req.body;

    if (!citizenText) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: citizenText'
      });
    }

    console.log(`\n📥 [API] Incoming Citizen Complaint: "${citizenText}"`);

    // Run the multi-agent pipeline
    const pipelineResult = await processCivicReport(
      citizenText,
      location || 'Downtown Sector 4',
      incidents
    );

    // Save the newly generated incident
    const newIncidentRecord = {
      id: `INC-${Date.now().toString().slice(-4)}`,
      category: pipelineResult.triageAnalysis?.category || 'Civic Operations',
      description: citizenText,
      location: location || 'Reported Location',
      priority: pipelineResult.triageAnalysis?.priority || 'Medium',
      status: 'Dispatched',
      assignedCrew: pipelineResult.dispatchPlan?.dispatchDetails?.crewAssigned || 'Standard Municipal Response Team',
      citizenContact: citizenContact || null,
      fullPipelineResult: pipelineResult,
      createdAt: new Date().toISOString()
    };

    addIncident(newIncidentRecord);

    return res.status(201).json({
      success: true,
      message: 'Complaint triaged and autonomous dispatch plan created.',
      incident: newIncidentRecord,
      pipeline: pipelineResult
    });
  } catch (error) {
    console.error('❌ [API Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process complaint through AI pipeline.'
    });
  }
});

export default router;