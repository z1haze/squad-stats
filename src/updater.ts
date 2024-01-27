import env from './util/env';
import redis from './lib/redis';
import update from './lib/update';

export default {
  async init() {
    await redis.flushall();

    setInterval(update, env.UPDATE_INTERVAL);

    await update();
  }
};
