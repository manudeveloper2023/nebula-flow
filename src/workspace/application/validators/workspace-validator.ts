import { z } from "zod";

export const workspaceSchema = z.object({
  name: z.string("Name must be a string").min(1, "Name cannot be empty"),
  description: z.string().nullable(),
});
