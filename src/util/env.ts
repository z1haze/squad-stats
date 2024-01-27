require('dotenv').config();

const SERVER_IDS = process.env.SERVER_IDS ? process.env.SERVER_IDS.split(',').map(x => +x) : [1]

export default {
  DEBUG: process.env.DEBUG === 'true',

  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : null,
  DB_USER: process.env.DB_USER || '',
  DB_PASS: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || '',

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  REDIS_PASS: process.env.REDIS_PASS,

  REDIS_BATCH_SIZE: process.env.REDIS_BATCH_SIZE ? parseInt(process.env.REDIS_BATCH_SIZE) : 100,

  TABLE_DEATHS: process.env.TABLE_DEATHS || '',
  TABLE_REVIVES: process.env.TABLE_REVIVES || '',
  TABLE_INCAPS: process.env.TABLE_DOWNS || '',
  TABLE_PLAYERS: process.env.TABLE_PLAYERS || '',
  TABLE_SERVERS: process.env.TABLE_SERVERS || '',
  TABLE_MATCHES: process.env.TABLE_MATCHES || '',

  SEASON_START: process.env.SEASON_START || '1970-01-01T00:00:00Z',

  MATCHES_MINIMUM: process.env.MATCHES_MINIMUM ? parseInt(process.env.MATCHES_MINIMUM) : 10,

  LAYERS_TO_IGNORE: process.env.LAYERS_TO_IGNORE ? process.env.LAYERS_TO_IGNORE.split(',') : [],

  UPDATE_INTERVAL: process.env.UPDATE_INTERVAL ? parseInt(process.env.UPDATE_INTERVAL) : 300000,

  BOT_TOKEN: process.env.BOT_TOKEN || '',
  GUILD_ID: process.env.GUILD_ID || '',
  LEADERBOARD_PAGE_SIZE: process.env.LEADERBOARD_PAGE_SIZE ? parseInt(process.env.LEADERBOARD_PAGE_SIZE) : 10,

  EMOJI_RATING: process.env.EMOJI_RATING || '',
  EMOJI_KILL: process.env.EMOJI_KILL || '',
  EMOJI_DOWN: process.env.EMOJI_DOWN || '',
  EMOJI_FALL: process.env.EMOJI_FALL || '',
  EMOJI_DEATH: process.env.EMOJI_DEATH || '',
  EMOJI_REVIVE: process.env.EMOJI_REVIVE || '',
  EMOJI_TK: process.env.EMOJI_TK || '',
  EMOJI_KD: process.env.EMOJI_KD || '',
  EMOJI_ID: process.env.EMOJI_ID || '',
  EMOJI_MATCHES: process.env.EMOJI_MATCHES || '',

  SERVER_IDS,
  SERVER_LABELS: process.env.SERVER_LABELS ? process.env.SERVER_LABELS.split(',') : SERVER_IDS.map(x => `Server ${x}`),

  STEAM_API_KEY: process.env.STEAM_API_KEY || '',
  SENTRY_DSN: process.env.SENTRY_DSN || '',
}
