// Pi Network Merchant Integration
const PiSDK = require('@pi-network/merchant-sdk');

class PiMerchantHub {
  constructor() {
    this.sdk = new PiSDK({
      appId: process.env.PI_APP_ID,
      apiKey: process.env.PI_MERCHANT_KEY
    });
  }

  // Secure Pi Payment
  async processPiPayment(amount, merchantWallet) {
    const guard = new TransactionGuard();
    
    if (!guard.validateTransaction(amount, merchantWallet)) {
      throw new Error('Transaction blocked - security violation');
    }
    
    return await this.sdk.transferPi({
      amount,
      to: merchantWallet,
      memo: 'LocalCommerceHub Payment'
    });
  }
}

module.exports = PiMerchantHub;
