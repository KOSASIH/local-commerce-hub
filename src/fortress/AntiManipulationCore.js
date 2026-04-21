class AntiManipulationCore {
  computeDataHash(data) {
    return this.doubleHash(this.tripleHash(JSON.stringify(data)));
  }

  createPriceHash(price, coin) {
    const priceString = `${coin.toUpperCase()}:${price}`;
    return this.quadrupleHash(priceString);
  }

  verifyDataIntegrity(originalData, currentData, expectedHash) {
    const computedHash = this.computeDataHash(currentData);
    return computedHash === expectedHash;
  }

  detectManipulation(originalSeal, currentData) {
    const issues = [];
    
    if (!this.verifyDataIntegrity(originalSeal.originalData, currentData, originalSeal.seal)) {
      issues.push('DATA_TAMPERED');
    }
    
    return {
      isClean: issues.length === 0,
      violations: issues
    };
  }

  quadrupleHash(data) {
    return this.hash(this.hash(this.hash(this.hash(data))));
  }
}
