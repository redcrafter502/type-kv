import { table } from "../../packages/core";
import { z } from "zod";

const usersTable = table(
  "users",
  z.object({
    name: z.string(),
    email: z.string().email(),
    age: z.number(),
  }),
);
