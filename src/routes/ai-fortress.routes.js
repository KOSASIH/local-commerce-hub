const express = require('express');
const SwarmController = require('../ai/AutonomousSwarmController');

const swarm = new AutonomousSwarmController();
const router = express.Router();

router.post('/ai-defend-payment', (req, res) => {
  const payment = req.body;
  swarm.guardian.commandAllAgents({
    type: 'PAYMENT_VALIDATION',
    data: payment
  });
  
  res.json({ status: 'AI_AGENTS_DEPLOYED' });
});

router.get('/ai-status', (req, res) => {
  res.json({
    swarmActive: swarm.swarmActive,
    agentsDeployed: swarm.guardian.subAgents.size,
    officialCurrencies: swarm.guardian.officialCurrencySymbols.size
  });
});

module.exports = router;
