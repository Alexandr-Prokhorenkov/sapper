export function getRandomBombs(min, max, count) {
  let cache = new Set();
  while(cache.size < count) {
    let bombIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    cache.add(bombIndex, -1)
  }
  return cache;
}

