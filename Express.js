const express = require('express');
const Web3SymbolShield = require('./middleware/Web3SymbolShield');

const app = express();

// FULL SYSTEM PROTECTION
app.use(Web3SymbolShield());

// Test endpoints
app.post('/dex/swap', (req, res) => {
  res.json({ success: true, protected: '✅ Symbol Shield Active' });
});

app.listen(3000, () => {
  console.log('🌌 Web3 Global Symbol Shield ACTIVE');
});
