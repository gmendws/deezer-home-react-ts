import Redis from 'ioredis';
import { promisify } from 'util';

const redisClient = new Redis(6379, "172.17.0.2");

function getRedis(value: string){
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);
}

function setRedis(key: string, value: string){
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

export { redisClient, getRedis, setRedis };