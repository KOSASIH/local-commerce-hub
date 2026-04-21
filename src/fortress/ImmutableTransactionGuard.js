class ImmutableTransactionGuard {
  constructor(citadel, shield, enforcer, core) {
    this.citadel = citadel;
    this.shield = shield;
    this.enforcer = enforcer;
    this.core = core;
  }

  validateMerchantTransaction(tx) {
    const merchantSeal = this.citadel.merchantRegistry.get(tx.merchantId);
    if (!merchantSeal) throw new Error('UNKNOWN_MERCHANT');
    
    this.enforcer.enforceCoinPayment(tx.coin, tx.amount);
    
    if (!merchantSeal.configHash === this.core.computeDataHash(tx.merchantConfig)) {
      throw new Error('MERCHANT_CONFIG_MANIPULATED');
    }
    
    return true;
  }

  validateProductPayment(productId, coin, amount) {
    if (!this.shield.validatePrice(productId, coin, amount)) {
      throw new Error('PRODUCT_PRICE_MANIPULATED');
    }
    return true;
  }
}
