export function toErrorsDict(errorsArray) {
  return errorsArray.reduce((acc, currValue) => {
    acc[currValue.field] = currValue.message;
    return acc;
  }, {});
}
