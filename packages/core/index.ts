import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { Table } from "./table";

export const table = <T extends StandardSchemaV1>(
  name: string,
  schema: T,
): Table<T> => {
  const validate = async (
    input: StandardSchemaV1.InferInput<T>,
  ): Promise<
    | { status: "success"; value: StandardSchemaV1.InferOutput<T> }
    | { status: "error"; error: Error }
  > => {
    let result = schema["~standard"].validate(input);
    if (result instanceof Promise) result = await result;

    if (result.issues) {
      return {
        status: "error",
        error: new Error(JSON.stringify(result.issues, null, 2)),
      };
    }

    return { status: "success", value: result.value };
  };
  return {
    validate,
    name,
  };
};
