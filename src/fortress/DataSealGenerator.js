class DataSealGenerator {
  generateEternalSeal(data) {
    const layers = [];
    
    for (let i = 0; i < 5; i++) {
      layers.push(this.core.quadrupleHash(JSON.stringify(data)));
      data = { previousSeal: layers[i], timestamp: Date.now(), data };
    }
    
    return {
      eternalSeal: layers,
      rootHash: layers[layers.length - 1],
      verificationPath: layers
    };
  }
}
