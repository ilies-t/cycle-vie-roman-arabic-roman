import { createClient } from 'redis';

export class RedisService {

    client;
    CACHE_PREFIX = process.env.CACHE_PREFIX;

    async init() {
        const redisUrl = process.env.REDIS_URL;

        if(redisUrl) {
            this.client = await createClient({ url: redisUrl }).connect();
        } else {
            this.client = await createClient().connect();
        }
    }

    async saveOne(key, value) {
        console.log(`Try to set key=${key}, value=${value}`);
        await this.client.set(this.CACHE_PREFIX + key, value);
    }

    async getValue(romanOrIntKey) {
        const result = await this.client.get(this.CACHE_PREFIX + romanOrIntKey);
        console.log(`Try to found key=${romanOrIntKey}, found=${result}`);
        return result;
    }
}