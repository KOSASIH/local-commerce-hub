class CurrencyEnforcerAgent {
  constructor(guardian) {
    this.guardian = guardian;
    this.bannedSymbols = new Set(['X', '+', '-', '*', '/', '.', 's', 'm', 'h']);
  }

  executeDefense(payment) {
    const symbol = payment.currencySymbol.toUpperCase();
    
    if (this.containsBannedChars(symbol)) {
      this.blockPayment(payment, 'BANNED_SYMBOL_DETECTED');
      return;
    }
    
    if (!this.guardian.validateCurrencySymbol(symbol)) {
      this.blockPayment(payment, 'UNAUTHORIZED_CURRENCY_SYMBOL');
      return;
    }
    
    this.approvePayment(payment);
  }

  containsBannedChars(symbol) {
    for (const char of this.bannedSymbols) {
      if (symbol.includes(char)) return true;
    }
    return false;
  }
}
