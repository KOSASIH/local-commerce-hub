/**
 * 🛡️ Universal Web3 Protection Middleware
 * Protects ALL blockchain APIs, DEX, wallets, dApps
 */
const Web3SymbolShield = (shield = new GlobalSymbolShieldAI()) => {
  return async (req, res, next) => {
    const paths = ['/swap', '/trade', '/price', '/token', '/contract'];
    
    if (paths.some(path => req.path.includes(path))) {
      const shieldResult = await shield.shieldWeb3Transaction({
        tokenSymbol: req.body.symbol || req.query.symbol,
        priceCurrency: req.body.currency,
        amounts: req.body.amounts
      });

      if (!shieldResult.approved) {
        return res.status(403).json({
          error: 'SYMBOL_SHIELD_BLOCKED',
          message: 'Scientific symbol abuse detected',
          violations: shieldResult.validations,
          protection: 'Web3 Global Symbol Shield Active'
        });
      }

      // Auto-correct request
      Object.assign(req.body, shieldResult.autoCorrected);
    }
    
    next();
  };
};
