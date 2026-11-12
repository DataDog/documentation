import { z } from "zod";

export const RegionSchema = z
  .object({
    key: z
      .string()
      .describe(
        "Region key, e.g. `us`, `eu`, `ap1`. Matches Hugo's `site` cookie value.",
      ),
    label: z.string().describe("Display label, e.g. `US1`, `EU`."),
    site: z.string().describe("API-site domain, e.g. `datadoghq.com`."),
  })
  .strict();

export type Region = z.infer<typeof RegionSchema>;
