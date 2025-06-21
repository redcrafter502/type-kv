import type { StandardSchemaV1 } from "@standard-schema/spec";

export const table = <T extends StandardSchemaV1>(
  name: string,
  schema: StandardSchemaV1.InferInput<T>,
): void => {};
