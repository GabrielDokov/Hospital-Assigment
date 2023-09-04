export function checkHealtChanged(patientArray) {
  return patientArray.map(
    ({ patientId, healthChanged, lastChange, lastStatus }) => ({
      patientId,
      healthChanged,

      ...(healthChanged ? { change: lastChange } : { last: lastStatus }),
    })
  );
}
