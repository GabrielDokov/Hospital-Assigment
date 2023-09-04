import { generateTemperature } from "./generateTemperature.js";

export default function generateData(IDs, readings, timespread) {
  const statusOptions = ["GREEN", "ORANGE", "RED", "GRAY", "PURPLE"];
  const timeInMileseconds = timespread * 1000;
  const patientData = [];

  for (const patientId of IDs) {
    const timestamp = Date.now() - Math.random() * timeInMileseconds;
    for (let i = 0; i < readings; i++) {
      const readingTimestamp = new Date(
        timestamp + (i * timeInMileseconds) / readings
      ).toISOString();
      const status =
        statusOptions[Math.floor(Math.random() * statusOptions.length)];
      const temperature = generateTemperature(5, 35); // this is fixed as Kliment said ---> make function to generate temperature
      patientData.push({
        patientId: patientId,
        time: readingTimestamp,
        type: "TEMPERATURE_SENSOR_ONSKIN",
        value: {
          temperatureC: temperature,
          status: status,
        },
      });
    }
    return patientData;
  }
}
