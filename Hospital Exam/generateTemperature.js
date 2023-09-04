export function generateTemperature(increment, min) {
  return (Math.random() * increment + min).toFixed(1);
}
