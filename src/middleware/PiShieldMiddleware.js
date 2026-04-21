/**
 * Express.js Middleware - Automatic PI Protection
 */
const PiShieldMiddleware = (shield = new PiEcosystemShield()) => {
  return async (req, res, next) => {
    try {
      // Protect all price-related endpoints
      if (req.path.match(/price|product|service|transaction/i)) {
        const shieldResult = await shield.shieldTransaction({
          symbol: req.body.symbol || req.query.symbol,
          prices: req.body.prices || req.body.price,
          merchantId: req.user?.merchantId
        });

        if (!shieldResult.approved) {
          return res.status(400).json({
            error: 'PI SYMBOL VIOLATION',
            details: shieldResult.validations,
            message: 'Use PI (Pi Coin ticker) only. π blocked.',
            corrected: shieldResult.validations.prices?.correctedPrice
          });
        }

        // Auto-correct and proceed
        req.body = shield.autoCorrectPrices(req.body);
      }
      
      next();
    } catch (error) {
      res.status(500).json({ error: 'SHIELD_ERROR', details: error.message });
    }
  };
};

module.exports = PiShieldMiddleware;
