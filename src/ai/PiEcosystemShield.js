/**
 * PI ECOSYSTEM MERCHANT SHIELD v2.0
 * Advanced AI-Powered PI Coin Symbol Protection
 * Blocks π manipulation, enforces PI ticker compliance
 */

class PiEcosystemShield {
  constructor() {
    this.PI_REGEX = /^[PI]{2,3}$/i; // PI, PI, π BLOCKED
    this.BLOCKED_SYMBOLS = ['π', 'pi', 'Pi', '⍴', 'ℼ'];
    this.PI_COIN_ONLY = ['PI', 'PI COIN'];
    this.aiShield = new AIShieldEngine();
  }

  /**
   * Super Advanced Symbol Validation
   */
  validatePiSymbol(symbol) {
    const normalized = symbol.toUpperCase().trim();
    
    // BLOCK 1: Mathematical Pi Detection
    if (this.BLOCKED_SYMBOLS.some(blocked => normalized.includes(blocked))) {
      return {
        valid: false,
        reason: 'BLOCKED: Mathematical π symbol detected',
        threatLevel: 'CRITICAL',
        fix: 'Use "PI" (Pi Coin ticker) only'
      };
    }

    // BLOCK 2: Regex Strict PI Validation
    if (!this.PI_REGEX.test(normalized)) {
      return {
        valid: false,
        reason: 'INVALID: Must use exact "PI" ticker',
        threatLevel: 'HIGH',
        fix: 'Replace with "PI" exactly'
      };
    }

    // BLOCK 3: AI Semantic Analysis
    const aiResult = this.aiShield.analyzePiIntent(symbol);
    if (!aiResult.isLegitPiCoin) {
      return {
        valid: false,
        reason: `AI DETECTED: ${aiResult.threatType}`,
        threatLevel: 'CRITICAL',
        fix: aiResult.correction
      };
    }

    return { valid: true, symbol: 'PI', status: 'APPROVED' };
  }

  /**
   * Price Enforcement - PI ONLY
   */
  validatePrice(priceData) {
    const issues = [];
    
    // Scan all price fields
    Object.keys(priceData).forEach(field => {
      const value = priceData[field];
      
      if (typeof value === 'string') {
        const symbolCheck = this.validatePiSymbol(value);
        if (!symbolCheck.valid) {
          issues.push({
            field,
            error: symbolCheck.reason,
            original: value,
            corrected: value.replace(/π|pi/gi, 'PI')
          });
        }
      }
    });

    return {
      valid: issues.length === 0,
      issues,
      correctedPrice: this.autoCorrectPrices(priceData)
    };
  }

  autoCorrectPrices(priceData) {
    const corrected = { ...priceData };
    Object.keys(corrected).forEach(field => {
      if (typeof corrected[field] === 'string') {
        corrected[field] = corrected[field]
          .replace(/π|pi|Pi/gi, 'PI')
          .replace(/\s+/g, ' ')
          .trim();
      }
    });
    return corrected;
  }

  /**
   * Real-time Transaction Shield
   */
  async shieldTransaction(txData) {
    const validations = {
      symbol: this.validatePiSymbol(txData.symbol),
      prices: this.validatePrice(txData.prices),
      merchant: await this.validateMerchantPiUsage(txData.merchantId)
    };

    const allValid = Object.values(validations).every(v => v.valid);
    
    return {
      approved: allValid,
      validations,
      logId: this.generateShieldLogId(),
      timestamp: new Date().toISOString()
    };
  }
}
