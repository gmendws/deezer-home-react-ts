import { createClient } from 'redis';

const redisClient = createClient({url: 'redis://172.17.0.2:6379'});

redisClient.connect();
console.log('Conectado ao redis!')

export default redisClient;