class CoinTickerEnforcer {
  constructor() {
    this.officialCoins = new Set(['PI', 'BTC', 'ETH', 'USDT', 'BNB']);
    this.coinValidationRules = {
      PI: { minDecimals: 2, maxDecimals: 6 },
      BTC: { minDecimals: 8, maxDecimals: 8 },
      ETH: { minDecimals: 18, maxDecimals: 18 }
    };
  }

  enforceCoinPayment(coin, amount) {
    const upperCoin = coin.toUpperCase();
    
    if (!this.officialCoins.has(upperCoin)) {
      throw new Error(`UNAUTHORIZED_COIN: ${upperCoin}`);
    }
    
    this.validateAmountFormat(amount, upperCoin);
    return upperCoin;
  }

  validateAmountFormat(amount, coin) {
    const rules = this.coinValidationRules[coin];
    if (!rules) return;
    
    const decimalPlaces = (amount.toString().split('.')[1] || '').length;
    if (decimalPlaces < rules.minDecimals || decimalPlaces > rules.maxDecimals) {
      throw new Error(`INVALID_AMOUNT_FORMAT: ${coin}`);
    }
  }
}
