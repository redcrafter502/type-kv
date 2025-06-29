import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { Table } from "../table";

export const table = <T extends StandardSchemaV1>(
  name: string,
  schema: T,
): Table => {
  const validate = async <T extends StandardSchemaV1>(
    input: StandardSchemaV1.InferInput<T>,
  ): Promise<StandardSchemaV1.InferOutput<T>> => {
    let result = schema["~standard"].validate(input);
    if (result instanceof Promise) result = await result;

    // if the `issues` field exists, the validation failed
    if (result.issues) {
      throw new Error(JSON.stringify(result.issues, null, 2));
    }

    return result.value;
  };
  return {
    name,
  };
};
