import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export type Death = {
  attacker: string;
  victim: string;
  teamkill: boolean;
  server: number;
  layer: string;
  match: number;
}

export type Incap = {
  attacker: string;
  victim: string;
  teamkill: boolean;
  server: number;
  layer: string;
  match: number;
}

export type PlayerServer = {
  id: number;
  name: string;
  incaps: number;
  kills: number;
  falls: number;
  deaths: number;
  revives: number;
  revived: number;
  kdr: number;
  idr: number;
  tks: number;
  tkd: number;
  rating: number;
  damage: number;
  matches?: Set<number>;
  matchCount: number;
  ke: number;
  de: number;
}

export type UpdatePlayersOptions = {
  playersMap: Map<string, Player>;
  deaths: Death[];
  incaps: Incap[];
  revives: Revive[];
}

export type AveragePlayerDeath = {
  steamId: string;
  amount: string;
}

export type Revive = {
  reviver: string;
  victim: string;
  server: number;
  layer: string;
  match: number;
}

export type Server = {
  id: number;
  name: string;
}

export type Command = {
  data: SlashCommandBuilder;
  execute: (a: ChatInputCommandInteraction) => any,
  autocomplete?: (a: AutocompleteInteraction) => any
}

/**
 * A player entity type
 */
export type Player = {
  steamId: string;
  name: string;
  servers: PlayerServer[];
}

export type LeaderboardType =
  "rating"
  | "kills"
  | "incaps"
  | "falls"
  | "deaths"
  | "revives"
  | "tks"
  | "tkd"
  | "matchCount"
  | "kdr"
  | "de"
  | "ke";
