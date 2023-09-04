import { HEALTH_READING_INTERVAL } from "./constants.js";

export function checkReadingInterval(
  currentTime,
  previousTime,
  healtReadingInterval = HEALTH_READING_INTERVAL
) {
  return currentTime - previousTime <= healtReadingInterval;
}
