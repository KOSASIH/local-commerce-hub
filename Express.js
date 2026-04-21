const express = require('express');
const PiShieldMiddleware = require('./middleware/PiShieldMiddleware');
const shield = new PiEcosystemShield();

const app = express();

// AUTO-PROTECT ALL ENDPOINTS
app.use(PiShieldMiddleware(shield));

app.post('/products', (req, res) => {
  // Automatically protected!
  // π → PI auto-corrected
  console.log('✅ PI Compliant Product:', req.body.price);
});
