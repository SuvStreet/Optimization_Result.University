export function formatEpisode(episodeString) {
  const match = episodeString.match(/S(\d+)E(\d+)/i);
  if (!match) return "Неверный формат";

  const season = parseInt(match[1], 10);
  const episode = parseInt(match[2], 10);

  return `${season} сезон ${episode} серия`;
}