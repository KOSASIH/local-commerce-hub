class MerchantDataCitadel {
  constructor() {
    this.merchantRegistry = new Map();
    this.productIntegrity = new Map();
    this.serviceShield = new Map();
    this.coinWhitelist = new Set(['PI', 'BTC', 'ETH', 'USDT']);
  }

  registerMerchant(merchantId, config) {
    if (!this.validateMerchantConfig(config)) {
      throw new Error('MERCHANT_CONFIG_REJECTED');
    }
    
    this.merchantRegistry.set(merchantId, {
      configHash: this.computeConfigHash(config),
      coinWhitelist: config.allowedCoins || ['PI'],
      dataSeal: this.sealMerchantData(config)
    });
  }

  validateMerchantConfig(config) {
    return config.allowedCoins.every(coin => this.coinWhitelist.has(coin.toUpperCase()));
  }

  sealMerchantData(data) {
    const seal = this.createDataSeal(data);
    return {
      originalData: data,
      seal,
      verificationKey: this.generateVerificationKey(seal)
    };
  }
}
