import knex from 'knex';
import {cloneDeep} from 'lodash';
import {performance} from 'perf_hooks';

import config from '../knexfile';
import keys from "../util/keys";
import env from "../util/env";

import {Player, PlayerServer, Server, Death, Incap, Revive} from '../types';

const db = knex(config);

export default db;

/**
 * Get all servers from the database
 */
export async function getServers() {
  const start = performance.now();

  const servers: Server[] = await db(env.TABLE_SERVERS)
    .select('id')
    .select('name');

  if (env.DEBUG) {
    console.log(`getServers found ${servers.length} and took ${performance.now() - start}ms`);
  }

  return servers;
}

/**
 * Get all players from the database
 */
export async function getPlayers() {
  const start = performance.now();

  const players: Player[] = await db(keys.TABLE_PLAYERS)
    .select('steamID as steamId')
    .select('lastName as name')
    .whereNotNull('lastName');

  if (env.DEBUG) {
    console.log(`getPlayers found ${players.length} and took ${performance.now() - start}ms`);
  }

  return players;
}

/**
 * Get all deaths from the database
 */
export async function getDeaths() {
  const start = performance.now();

  const deaths: Death[] = await db(keys.TABLE_DEATHS)
    .join(keys.TABLE_MATCHES, `${keys.TABLE_DEATHS}.match`, '=', `${keys.TABLE_MATCHES}.id`)
    .select(`${keys.TABLE_MATCHES}.layerClassname as layer`)
    .select(`${keys.TABLE_DEATHS}.attacker`)
    .select(`${keys.TABLE_DEATHS}.victim`)
    .select(`${keys.TABLE_DEATHS}.teamkill`)
    .select(`${keys.TABLE_DEATHS}.server`)
    .select(`${keys.TABLE_DEATHS}.match`)
    .where(`${keys.TABLE_DEATHS}.time`, '>=', env.SEASON_START);

  if (env.DEBUG) {
    console.log(`getDeaths found ${deaths.length} and took ${performance.now() - start}ms`);
  }

  return deaths;
}

/**
 * Get all incaps from the database
 */
export async function getIncaps() {
  const start = performance.now();

  const incaps: Incap[] = await db(keys.TABLE_INCAPS)
    .join(keys.TABLE_MATCHES, `${keys.TABLE_INCAPS}.match`, '=', `${keys.TABLE_MATCHES}.id`)
    .select(`${keys.TABLE_MATCHES}.layerClassname as layer`)
    .select(`${keys.TABLE_INCAPS}.attacker`)
    .select(`${keys.TABLE_INCAPS}.victim`)
    .select(`${keys.TABLE_INCAPS}.damage`)
    .select(`${keys.TABLE_INCAPS}.server`)
    .select(`${keys.TABLE_INCAPS}.match`)
    .where(`${keys.TABLE_INCAPS}.time`, '>=', env.SEASON_START);


  if (env.DEBUG) {
    console.log(`getIncaps found ${incaps.length} and took ${performance.now() - start}ms`);
  }

  return incaps;
}

/**
 * Get all revives from the database
 */
export async function getRevives() {
  const start = performance.now();

  const revives: Revive[] = await db(keys.TABLE_REVIVES)
    .join(keys.TABLE_MATCHES, `${keys.TABLE_REVIVES}.match`, '=', `${keys.TABLE_MATCHES}.id`)
    .select(`${keys.TABLE_MATCHES}.layerClassname as layer`)
    .select(`${keys.TABLE_REVIVES}.reviver`)
    .select(`${keys.TABLE_REVIVES}.victim`)
    .select(`${keys.TABLE_REVIVES}.server`)
    .select(`${keys.TABLE_REVIVES}.match`)
    .where(`${keys.TABLE_REVIVES}.time`, '>=', env.SEASON_START);

  if (env.DEBUG) {
    console.log(`getRevives found ${revives.length} records and took ${performance.now() - start}ms`);
  }

  return revives;
}

/**
 * Initialize all players as empty stubs
 * @param {Player[]} players
 */
export async function initPlayers(players: Player[]) {
  const start = performance.now();
  const playersMap: Map<string, Player> = new Map();
  const servers = await getServers();

  /**
   * Create a stub for a player on each server
   */
  const playerServerStubs: PlayerServer[] = servers.map((server) => ({
    id: server.id,
    name: server.name,
    incaps: 0,
    kills: 0,
    falls: 0,
    deaths: 0,
    revives: 0,
    revived: 0,
    kdr: 0,
    idr: 0,
    tks: 0,
    tkd: 0,
    rating: 0,
    damage: 0,
    matchCount: 0,
    matches: new Set<number>(),
    ke: 0,
    de: 0
  }));

  players.forEach((player) => {
    /**
     * Clone the player stub for each player
     */
    player.servers = cloneDeep(playerServerStubs);

    /**
     * Associate the player record with their steam ID
     */
    playersMap.set(player.steamId, player);
  });

  if (env.DEBUG) {
    console.log(`initPlayers took ${performance.now() - start}ms`);
  }

  return playersMap;
}

