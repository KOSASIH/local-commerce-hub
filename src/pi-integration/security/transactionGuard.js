class TransactionGuard {
  validateTransaction(amount, wallet) {
    // 1. Rate limiting
    if (this.checkRateLimit(wallet)) return false;
    
    // 2. Amount validation
    if (amount < 0.01 || amount > 10000) return false;
    
    // 3. Wallet blacklist check
    if (this.isBlacklisted(wallet)) return false;
    
    // 4. AML screening
    return this.amlCheck(wallet, amount);
  }
}
