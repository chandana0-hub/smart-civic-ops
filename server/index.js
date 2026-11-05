// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so your frontend teammates can call this API
app.use(cors());
app.use(express.json());

// Mount the AI and Incident routes
app.use('/api', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', system: 'Smart Civic Operations AI Backend' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Smart Civic Operations Server running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints available:`);
  console.log(`   - GET  http://localhost:${PORT}/api/incidents`);
  console.log(`   - POST http://localhost:${PORT}/api/complaints\n`);
});
