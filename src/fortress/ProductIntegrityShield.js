class ProductIntegrityShield {
  protectProduct(productData, merchantId) {
    const protection = {
      productId: productData.id,
      merchantId,
      priceSeal: this.sealPrice(productData.price, productData.allowedCoins),
      inventoryLock: this.lockInventory(productData.inventory),
      metadataHash: this.hashProductMetadata(productData)
    };
    
    this.productIntegrity.set(productData.id, protection);
    return protection;
  }

  sealPrice(price, allowedCoins) {
    return allowedCoins.map(coin => ({
      coin: coin.toUpperCase(),
      price: price,
      priceHash: this.createPriceHash(price, coin)
    }));
  }

  validatePrice(productId, coin, price) {
    const protection = this.productIntegrity.get(productId);
    if (!protection) return false;
    
    const priceRecord = protection.priceSeal.find(p => p.coin === coin.toUpperCase());
    return priceRecord && priceRecord.priceHash === this.createPriceHash(price, coin);
  }
                            }
