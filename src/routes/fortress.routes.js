const express = require('express');
const Citadel = require('../fortress/MerchantDataCitadel');
const Shield = require('../fortress/ProductIntegrityShield');
const Guard = require('../fortress/ImmutableTransactionGuard');

const citadel = new MerchantDataCitadel();
const shield = new ProductIntegrityShield();
const enforcer = new CoinTickerEnforcer();
const core = new AntiManipulationCore();
const guard = new ImmutableTransactionGuard(citadel, shield, enforcer, core);

const router = express.Router();

router.post('/register-merchant', (req, res) => {
  try {
    const merchantId = citadel.registerMerchant(req.body.id, req.body.config);
    res.json({ merchantId, status: 'SEALED' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/protect-product', (req, res) => {
  try {
    const protection = shield.protectProduct(req.body.product, req.body.merchantId);
    res.json({ protectionId: protection.productId, status: 'LOCKED' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/secure-payment', async (req, res) => {
  try {
    guard.validateMerchantTransaction(req.body.tx);
    guard.validateProductPayment(req.body.productId, req.body.coin, req.body.amount);
    res.json({ status: 'PAYMENT_AUTHORIZED', coin: req.body.coin.toUpperCase() });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});

module.exports = router;
