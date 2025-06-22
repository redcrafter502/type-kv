import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { Table } from "../table";

export const table = <T extends StandardSchemaV1>(
  name: string,
  schema: StandardSchemaV1.InferInput<T>,
): Table => {
  return { name };
};
