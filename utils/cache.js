const redis = require('../config/redis');

const cache = {
  async get(key) {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key, value, ttl = 3600) {
    await redis.set(key, JSON.stringify(value), 'EX', ttl);
  },
  async del(key) {
    await redis.del(key);
  }
};

module.exports = cache;
