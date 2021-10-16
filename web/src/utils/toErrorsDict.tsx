import { FieldError } from "../generated/graphql";

export function toErrorsDict(errorsArray: FieldError[]) {
  return errorsArray.reduce((acc: Record<string, string>, currValue) => {
    acc[currValue.field] = currValue.message;
    return acc;
  }, {});
}
