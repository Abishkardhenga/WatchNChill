import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Critical: Handle errors so your app doesn't crash if Redis goes down
redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log("Connected to Redis");
    }
    return redisClient;
};

export default redisClient;