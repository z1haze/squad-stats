import redis from './redis';
import env from '../util/env';
import keys from '../util/keys';

import { getDeaths, getIncaps, getPlayers, getRevives, initPlayers } from './knex';
import { chunk } from 'lodash';
import { updatePlayers } from './player';

export default async () => {
  const start = new Date();

  await redis.set('updating', 'true');

  const players = await getPlayers();

  // Redis recommends limiting pipelines groups of 100
  const playerChunks = chunk(players, env.REDIS_BATCH_SIZE);

  // store players in redis with their username as the key and Steam ID as the value so that we can use HSCAN for user searching
  await Promise.all(
    playerChunks.map(async (players) => {
      const pipeline = redis.pipeline();

      players.forEach((player) => {
        pipeline.hset(keys.PLAYERS, player.name, player.steamId);
      });

      return pipeline.exec();
    })
  );

  /**
   * A Map of stubbed out players objects
   */
  const playersMap = await initPlayers(players);

  /**
   * An array of incaps from the database
   */
  const incaps = await getIncaps();

  /**
   * An array of deaths from the database
   */
  const deaths = await getDeaths();

  /**
   * An array of revives from the database
   */
  const revives = await getRevives();


  /**
   * Update stats for every player in the playersMap
   */
  await updatePlayers({playersMap, deaths, incaps, revives});

  /**
   * Clear the updating flag
   */
  await redis.del('updating');

  console.log(`Stats sync started at ${start.toLocaleTimeString()} and took ${Date.now() - start.getTime()}ms`);
}
