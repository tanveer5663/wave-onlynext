import Redis from "ioredis";
let redis;
const connectRedis = async () => {
  let redis;

  if (!global.redis) {
    const redisInstance = new Redis(process.env.REDIS_URL);

    // Optional: wait until connected
    // only works in Node.js ESM

    redisInstance.on("connect", () => console.log("[Redis] Connected"));
    redisInstance.on("error", (err) => console.error("[Redis] Error:", err));

    global.redis = redisInstance;
  }

  redis = global.redis;
  return redis;
};

export default connectRedis;
