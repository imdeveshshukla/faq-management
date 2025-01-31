const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost',
  port: 6379
});

redis.on('error', (err) => console.error('Redis error:', err));

module.exports = redis;
