import type { Table } from "../table";
import { Redis, type RedisConfigNodejs } from "@upstash/redis";

export const upstashRedisAdapter = (config: RedisConfigNodejs) => {
  const redis = new Redis(config);

  return (table: Table) => {
    return {
      async get(id: string) {
        const key = `${table.name}:${id}`;
        return await redis.get(key);
      },
      async set(id: string, value: any) {
        const key = `${table.name}:${id}`;
        await redis.set(key, value);
      },
    };
  };
};
