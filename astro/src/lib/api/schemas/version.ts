import { z } from "zod";

export const ApiVersionSchema = z.enum(["v1", "v2"]);

export type ApiVersion = z.infer<typeof ApiVersionSchema>;
