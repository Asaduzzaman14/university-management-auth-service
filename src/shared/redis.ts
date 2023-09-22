import { SetOptions, createClient } from 'redis';
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

const set = async (
  key: string,
  value: string,
  options?: SetOptions
): Promise<void> => {
  await redisClient.set(key, value, options);
};

const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
//
//
const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.set(key, token, { EX: Number(config.redis.expries_in) });
};

const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token:${userId}`;

  return await redisClient.get(key);
};

const delAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.del(key);
};

const disconect = async () => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};

export const RedisClient = {
  connect,
  set,
  get,
  del,
  disconect,
  setAccessToken,
  getAccessToken,
  delAccessToken,
  publish: redisClient.publish.bind(redisPubClient),
  subscribe: redisClient.subscribe.bind(redisSubClient),
};
