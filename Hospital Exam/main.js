import { allowedColorsChange } from "./allowedColorsChange.js";
import { patientData } from "./patientData.js";
import { checkHealtChanged } from "./checkHealtChanged.js";
import { checkReadingInterval } from "./checkReadingInterval.js";
import generateData from "./generateData.js";
import dateUtils from "./dateUtils.js";
import { findExistingPatient } from "./utils.js";

const healthChangesArray = [];

function main(data) {
  data.sort(dateUtils.sortByDate);
  data.forEach((patient) => {
    // this is fixed with forEach as Kliment said array.map() ---> array.forEach()

    const patientId = patient.patientId;
    const currentStatus = patient.value.status;

    if (
      !healthChangesArray.find((item) => findExistingPatient(item, patientId))
    ) {
      const lastChange = {
        patientId: patientId,
        healthChanged: false,
        lastStatus: {
          status: currentStatus,
          value: patient.value.temperatureC,
          time: patient.time,
        },
      };
      healthChangesArray.push(lastChange);
    } else {
      const existingPatient = healthChangesArray.find((item) =>
        findExistingPatient(item, patientId)
      );
      const previousStatus = existingPatient.lastStatus.status;
      const previousTime = dateUtils.convertDateToMs(
        existingPatient.lastStatus.time
      );
      const currentTime = dateUtils.convertDateToMs(patient.time);

      if (
        allowedColorsChange.hasOwnProperty(previousStatus) &&
        allowedColorsChange[previousStatus].includes(currentStatus)
      ) {
        if (checkReadingInterval(currentTime, previousTime)) {
          existingPatient.healthChanged = true;
          existingPatient.lastChange = {
            from: previousStatus,
            to: currentStatus,
            value: patient.value.temperatureC,
            changedOn: dateUtils.convertMsToIso(currentTime),
          };
        }
        //  existingPatient.healthChanged = false
      }
      existingPatient.lastStatus = {
        status: currentStatus, //previousStatus
        value: patient.value.temperatureC, //previousTemperature
        time: patient.time,
      };
    }
  });

  const result = checkHealtChanged(healthChangesArray);
  console.log(result);
}

const generatedData = generateData([10, 20, 30], 3, 86000); // this is data generated by the generateData
//patientData ---> comes from patientData.js

main(patientData);