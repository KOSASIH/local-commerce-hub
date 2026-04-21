class MerchantShieldAgent {
  constructor(guardian) {
    this.guardian = guardian;
    this.merchantStatus = new Map();
  }

  executeDefense(merchantActivity) {
    const merchantId = merchantActivity.merchantId;
    
    if (!this.isMerchantLegitimate(merchantId)) {
      this.lockMerchant(merchantId, 'UNVERIFIED_MERCHANT');
      return;
    }
    
    this.validateMerchantPayments(merchantActivity.payments);
  }

  validateMerchantPayments(payments) {
    payments.forEach(payment => {
      if (!this.guardian.validateCurrencySymbol(payment.currency)) {
        this.flagSuspiciousMerchant(payment.merchantId);
      }
    });
  }
}
