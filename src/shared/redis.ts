import { createClient } from 'redis';
import config from '../config';

const redisClient = createClient({
  url: config.redis.url,
});

const redisPubClient = createClient({
  url: config.redis.url,
});

const redisSubClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', err => console.log('RedisError:', err));
redisClient.on('connect', () => console.log('Redis Connected:'));

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};

export const RedisClient = {
  connect,
  publish: redisClient.publish.bind(redisPubClient),
  subscrive: redisClient.publish.bind(redisSubClient),
};
