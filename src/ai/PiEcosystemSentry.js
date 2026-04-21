class PiEcosystemSentry {
  constructor(guardian) {
    this.guardian = guardian;
    this.piSpecificRules = {
      PI: { requiredForPiMerchants: true, symbolLock: true }
    };
  }

  protectPiMerchants(merchantTx) {
    if (merchantTx.ecosystem === 'PI' && 
        merchantTx.currencySymbol !== 'PI') {
      throw new Error('PI_ECOSYSTEM_MERCHANTS_PI_ONLY');
    }
  }
}
