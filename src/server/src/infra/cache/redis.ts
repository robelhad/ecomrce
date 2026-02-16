import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, { 
  tls: {}, // REQUIRED for Upstash 
  maxRetriesPerRequest: null, 
  enableReadyCheck: false, // Prevent connection storms 
  lazyConnect: true, // Prevent Upstash idle disconnects 
  keepAlive: 30000, // Always reconnect 
  reconnectOnError: () => true, 
});
redis.connect().catch(() => {});
redis.on("connect", () => console.log("✅ Connected to Redis"))
redis.on("error", (err) => console.error("❌ Redis error:", err));

export default redis;
