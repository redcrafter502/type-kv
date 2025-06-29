import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { Table } from "./table";
import { Redis, type RedisConfigNodejs } from "@upstash/redis";

export const upstashRedisAdapter = (config: RedisConfigNodejs) => {
  const redis = new Redis(config);

  return <T extends StandardSchemaV1>(table: Table<T>) => {
    return {
      async get(id: string): Promise<
        | {
            status: "error";
            error: Error;
          }
        | {
            status: "success";
            value: StandardSchemaV1.InferOutput<T>;
          }
      > {
        const key = `${table.name}:${id}`;
        const result = await redis.get(key);
        const validatedResult = await table.validate(result);
        return validatedResult;
      },
      async set(id: string, value: StandardSchemaV1.InferOutput<T>) {
        const key = `${table.name}:${id}`;
        await redis.set(key, value);
      },
    };
  };
};
