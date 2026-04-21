class ServiceProtectionVault {
  secureService(serviceData, merchantId) {
    const serviceSeal = {
      serviceId: serviceData.id,
      merchantId,
      feeStructure: this.sealFeeStructure(serviceData.fees, serviceData.allowedCoins),
      capacityLock: this.lockServiceCapacity(serviceData.capacity),
      contractHash: this.hashServiceContract(serviceData)
    };
    
    this.serviceShield.set(serviceData.id, serviceSeal);
    return serviceSeal;
  }

  sealFeeStructure(fees, allowedCoins) {
    return fees.map(fee => ({
      feeType: fee.type,
      amount: fee.amount,
      coinRecords: allowedCoins.map(coin => ({
        coin: coin.toUpperCase(),
        amount: fee.amount,
        hash: this.createFeeHash(fee.amount, coin)
      }))
    }));
  }
}
