/**
 * Automatic PI Price Formatting & Correction
 */
const PiPriceFormatter = {
  formatPrice(price) {
    if (typeof price !== 'string') return price;
    
    return price
      .replace(/π|pi|Pi/gi, 'PI')
      .replace(/(\d+)\s*PI/i, '$1 PI')
      .replace(/PI\s+(\d+)/i, 'PI $1')
      .trim();
  },

  validateProductPrice(product) {
    ['price', 'originalPrice', 'salePrice'].forEach(field => {
      if (product[field]) {
        product[field] = this.formatPrice(product[field]);
      }
    });
    return product;
  }
};
