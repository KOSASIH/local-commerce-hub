const express = require('express');
const helmet = require('helmet');
const PiFortress = require('../pi-integration/core/PiFortress');
const fortress = new PiFortress();

const router = express.Router();

// Enterprise-grade middleware stack
router.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));

// Super-secure payment endpoint
router.post('/pay', async (req, res) => {
  try {
    const { amount, wallet, fingerprint } = req.body;
    
    // 7-layer security check
    const risk = await fortress.riskScore({
      amount, wallet, ip: req.ip, fingerprint
    });

    if (risk > 75) {
      return res.status(403).json({ 
        error: 'HIGH_RISK_BLOCKED',
        riskScore: risk 
      });
    }

    // Execute payment
    const tx = await fortress.processPiPayment(amount, wallet);
    
    res.json({
      success: true,
      txId: tx.id,
      riskScore: risk,
      confirmations: tx.confirmations
    });

  } catch (error) {
    res.status(500).json({ error: 'SECURITY_VIOLATION' });
  }
});

module.exports = router;
