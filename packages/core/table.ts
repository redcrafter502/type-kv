import type { StandardSchemaV1 } from "@standard-schema/spec";

export type Table<T extends StandardSchemaV1> = {
  name: string;
  validate: (
    input: StandardSchemaV1.InferInput<T>,
  ) => Promise<
    | { status: "success"; value: StandardSchemaV1.InferOutput<T> }
    | { status: "error"; error: Error }
  >;
};
