import "dotenv/config";
import { table } from "../../packages/core/dist/index.mjs";
import { upstashRedisAdapter } from "../../packages/upstash-redis/dist/index.mjs";
import { z } from "zod";

const usersTable = table(
  "users",
  z.object({
    name: z.string(),
    email: z.string().email(),
    age: z.number(),
  }),
);

const db = upstashRedisAdapter({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

await db(usersTable).set("1", {
  name: "User 1",
  email: "user1@example.com",
  age: 27,
});
console.log("Between set and get");
console.log(await db(usersTable).get("1"));
