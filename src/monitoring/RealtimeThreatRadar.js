// Real-time Threat Radar Dashboard
const WebSocket = require('ws');
const Redis = require('redis');

class ThreatRadar {
  constructor() {
    this.redis = Redis.createClient();
    this.wss = new WebSocket.Server({ port: 8081 });
    this.threats = new Map();
  }

  // Live threat feed
  startRadar() {
    setInterval(async () => {
      const liveThreats = await this.redis.get('live_threats');
      this.broadcast(JSON.parse(liveThreats));
    }, 1000);
  }

  broadcast(threatData) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(threatData));
      }
    });
  }
}
