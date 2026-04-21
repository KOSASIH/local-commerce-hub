// Pi Blockchain Oracle - Real-time data feeds
class PiOracle {
  constructor() {
    this.ws = new WebSocket('wss://mainnet.minepi.com/ws');
    this.priceFeed = {};
  }

  async getPiPrice() {
    return await fetch('https://oracle.minepi.com/v1/pi-usd')
      .then(r => r.json());
  }

  // Watch merchant wallet 24/7
  watchWallet(wallet, callback) {
    this.ws.send(JSON.stringify({
      method: 'subscribe',
      params: { address: wallet, events: ['transfer', 'approve'] }
    }));
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
  }
}
