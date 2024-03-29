import env from "./env";

const ignores = env.LAYERS_TO_IGNORE;

export function shouldIgnoreLayer(layer: string) {
  for (const ignore of ignores) {
    if (layer.toLowerCase().includes(ignore.toLowerCase())) {
      return true;
    }
  }

  return false;
}

/**
 * Dynamically import a file from a file path
 *
 * @param filePath
 */
export async function importFile(filePath: string) {
  return (await import(filePath))?.default;
}

/**
 * Given a number, provide the correct string suffix
 *
 * @param d
 */
export function nth(d: number) {
  if (d > 3 && d < 21) return 'th';

  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function truncate(str: string, length: number, end = '...') {
  return str.length > length ? str.substring(0, length - end.length) + end : str;
}

export function generateStatsField(emoji: string, title: string, value: string, rank: number) {
  let content = `${emoji} **${title}**: \`${value}\``;

  if (rank !== null) {
    rank++;
    content += ` (${rank.toLocaleString()}${nth(rank)})`;
  }

  return content;
}

export const serverOptions = env.SERVER_IDS.map(id => {
  const label = env.SERVER_LABELS[env.SERVER_IDS.indexOf(id)] ?? `Server ${id}`;

  return {name: label, value: id};
});

export function getServerLabel(serverId: number) {
  return serverOptions.find(option => option.value === serverId)?.name ?? `Server ${serverId}`;
}
